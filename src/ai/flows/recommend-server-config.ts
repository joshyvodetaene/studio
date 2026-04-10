'use server';
/**
 * @fileOverview This file implements a Genkit flow for recommending the most optimal VPN server
 * based on user needs, prioritizing High-Performance and Bandwidth.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {MOCK_SERVERS} from '@/lib/mock-data';

const RecommendServerConfigInputSchema = z.object({
  vpnNeeds: z.string().describe('User description of VPN needs. Focus on "Performance", "Speed", "Latency".'),
  clientPublicKey: z.string().describe('The WireGuard client public key.'),
});
export type RecommendServerConfigInput = z.infer<typeof RecommendServerConfigInputSchema>;

const PromptOutputSchema = z.object({
  recommendedServerId: z.string().describe('The ID of the recommended High-Performance VPN server.'),
  explanation: z.string().describe('A brief explanation focusing on bandwidth and throughput benefits.'),
});

const RecommendServerConfigOutputSchema = z.object({
  recommendedServerId: z.string().describe('The ID of the recommended VPN server.'),
  explanation: z.string().describe('A brief explanation of the recommendation.'),
  wireguardConfigDetails: z.object({
    serverEndpoint: z.string().describe('The endpoint of the server.'),
    serverPublicKey: z.string().describe('The public key of the server.'),
    clientAddress: z.string().describe('Client IP.'),
    dns: z.array(z.string()).describe('DNS servers.'),
  }),
});
export type RecommendServerConfigOutput = z.infer<typeof RecommendServerConfigOutputSchema>;

const recommendServerPrompt = ai.definePrompt({
  name: 'recommendServerPrompt',
  input: {schema: z.object({vpnNeeds: z.string(), serversJson: z.string()})},
  output: {schema: PromptOutputSchema},
  prompt: `You are a Network Performance Engineer.
Select the server that provides the MAX THROUGHPUT and MIN LATENCY for the following needs.

User's Needs: "{{{vpnNeeds}}}"

Available Performance Nodes:
{{{serversJson}}}

Prioritize nodes with the highest "bandwidth" and lowest "latency".
Output a JSON object with recommendedServerId and explanation.`,
});

const recommendServerConfigFlow = ai.defineFlow(
  {
    name: 'recommendServerConfigFlow',
    inputSchema: RecommendServerConfigInputSchema,
    outputSchema: RecommendServerConfigOutputSchema,
  },
  async (input) => {
    const availableServers = MOCK_SERVERS;

    const { output } = await recommendServerPrompt({
      vpnNeeds: input.vpnNeeds,
      serversJson: JSON.stringify(availableServers),
    });

    if (!output?.recommendedServerId) {
      throw new Error('AI failed to recommend a high-performance node.');
    }

    const recommendedServer = availableServers.find(s => s.id === output.recommendedServerId);

    if (!recommendedServer) {
      throw new Error('Recommended performance node not found.');
    }

    return {
      recommendedServerId: output.recommendedServerId,
      explanation: output.explanation,
      wireguardConfigDetails: {
        serverEndpoint: recommendedServer.endpoint,
        serverPublicKey: recommendedServer.publicKey,
        clientAddress: '10.8.0.2/32',
        dns: ['1.1.1.1', '8.8.8.8'],
      },
    };
  }
);

export async function recommendServerConfig(input: RecommendServerConfigInput): Promise<RecommendServerConfigOutput> {
  return recommendServerConfigFlow(input);
}
