'use server';
/**
 * @fileOverview This file implements a Genkit flow for recommending the most optimal VPN server
 * based on user needs using local mock data for a standalone experience.
 *
 * - recommendServerConfig - A function that handles the server recommendation process.
 * - RecommendServerConfigInput - The input type for the recommendServerConfig function.
 * - RecommendServerConfigOutput - The return type for the recommendServerConfig function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {MOCK_SERVERS} from '@/lib/mock-data';

// Define input schema
const RecommendServerConfigInputSchema = z.object({
  vpnNeeds: z.string().describe('A description of the user\'s VPN needs (e.g., "fastest connection for streaming", "maximum privacy").'),
  clientPublicKey: z.string().describe('The WireGuard client public key.'),
  idToken: z.string().optional(),
  uid: z.string().optional(),
});
export type RecommendServerConfigInput = z.infer<typeof RecommendServerConfigInputSchema>;

// Define output schema for the prompt part
const PromptOutputSchema = z.object({
  recommendedServerId: z.string().describe('The ID of the recommended VPN server.'),
  explanation: z.string().describe('A brief explanation of why this server was recommended.'),
});

// Define output schema for the entire flow
const RecommendServerConfigOutputSchema = z.object({
  recommendedServerId: z.string().describe('The ID of the recommended VPN server.'),
  explanation: z.string().describe('A brief explanation of why this server was recommended.'),
  wireguardConfigDetails: z.object({
    serverEndpoint: z.string().describe('The endpoint of the recommended VPN server.'),
    serverPublicKey: z.string().describe('The public key of the recommended VPN server.'),
    clientAddress: z.string().describe('The client IP address allocated for the user.'),
    dns: z.array(z.string()).describe('DNS servers to be used by the client.'),
  }),
});
export type RecommendServerConfigOutput = z.infer<typeof RecommendServerConfigOutputSchema>;

// Genkit prompt definition
const recommendServerPrompt = ai.definePrompt({
  name: 'recommendServerPrompt',
  input: {schema: RecommendServerConfigInputSchema.pick({vpnNeeds: true}).extend({serversJson: z.string()})},
  output: {schema: PromptOutputSchema},
  prompt: `You are an intelligent VPN server recommender.
Analyze the user's needs and select the best server from the list.

User's Needs: "{{{vpnNeeds}}}"

Available Servers:
{{{serversJson}}}

Output a JSON object with:
- recommendedServerId: string
- explanation: string (concise)`,
});

// Genkit flow definition using local mock data for standalone operation
const recommendServerConfigFlow = ai.defineFlow(
  {
    name: 'recommendServerConfigFlow',
    inputSchema: RecommendServerConfigInputSchema,
    outputSchema: RecommendServerConfigOutputSchema,
  },
  async (input) => {
    // Use local mock servers for a standalone experience
    const availableServers = MOCK_SERVERS;

    const { output } = await recommendServerPrompt({
      vpnNeeds: input.vpnNeeds,
      serversJson: JSON.stringify(availableServers),
    });

    if (!output?.recommendedServerId) {
      throw new Error('AI failed to recommend a server.');
    }

    const recommendedServer = availableServers.find(s => s.id === output.recommendedServerId);

    if (!recommendedServer) {
      throw new Error('Recommended server not found in local list.');
    }

    // Mock config generation for standalone mode
    return {
      recommendedServerId: output.recommendedServerId,
      explanation: output.explanation,
      wireguardConfigDetails: {
        serverEndpoint: recommendedServer.endpoint,
        serverPublicKey: recommendedServer.publicKey,
        clientAddress: '10.0.0.2/32',
        dns: ['1.1.1.1', '8.8.8.8'],
      },
    };
  }
);

export async function recommendServerConfig(input: RecommendServerConfigInput): Promise<RecommendServerConfigOutput> {
  return recommendServerConfigFlow(input);
}
