/**
 * @fileOverview This file implements a Genkit flow for recommending the most optimal VPN server
 * based on user needs, prioritizing Anonymity and Performance.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {PRODUCTION_SERVERS} from '@/lib/mock-data';

const RecommendServerConfigInputSchema = z.object({
  vpnNeeds: z.string().describe('User description of VPN needs. Focus on "Anonymity", "Onion", "Privacy", "Throughput".'),
  clientPublicKey: z.string().describe('The WireGuard client public key.'),
});
export type RecommendServerConfigInput = z.infer<typeof RecommendServerConfigInputSchema>;

const PromptOutputSchema = z.object({
  recommendedServerId: z.string().describe('The ID of the recommended secure VPN node.'),
  explanation: z.string().describe('A brief explanation focusing on anonymity layers and performance.'),
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
  prompt: `You are a Cyber Security Architect.
Select the optimal node that ensures MAXIMUM ANONYMITY and HIGH THROUGHPUT for the following request.

User's Needs: "{{{vpnNeeds}}}"

Production Infrastructure Nodes:
{{{serversJson}}}

Prioritize nodes from "Torservers.net", "Calyx Institute", or "Infomaniak" if anonymity is requested.
Output a JSON object with recommendedServerId and explanation.`,
});

const recommendServerConfigFlow = ai.defineFlow(
  {
    name: 'recommendServerConfigFlow',
    inputSchema: RecommendServerConfigInputSchema,
    outputSchema: RecommendServerConfigOutputSchema,
  },
  async (input) => {
    const availableServers = PRODUCTION_SERVERS;

    try {
      const { output } = await recommendServerPrompt({
        vpnNeeds: input.vpnNeeds,
        serversJson: JSON.stringify(availableServers),
      });

      if (!output?.recommendedServerId) {
        throw new Error('Analysis mismatch');
      }

      const recommendedServer = availableServers.find(s => s.id === output.recommendedServerId) || availableServers[0];

      return {
        recommendedServerId: recommendedServer.id,
        explanation: output.explanation,
        wireguardConfigDetails: {
          serverEndpoint: recommendedServer.endpoint,
          serverPublicKey: recommendedServer.publicKey,
          clientAddress: '10.8.0.2/32',
          dns: ['1.1.1.1', '8.8.8.8', '9.9.9.9'],
        },
      };
    } catch (error) {
      const recommendedServer = availableServers[0];
      return {
        recommendedServerId: recommendedServer.id,
        explanation: "Basierend auf Ihrer Sicherheitsanforderung wurde dieser Hochleistungs-Knoten für optimale Anonymität und Durchsatz ausgewählt (Automatischer Analyse-Fallback).",
        wireguardConfigDetails: {
          serverEndpoint: recommendedServer.endpoint,
          serverPublicKey: recommendedServer.publicKey,
          clientAddress: '10.8.0.2/32',
          dns: ['1.1.1.1', '8.8.8.8', '9.9.9.9'],
        },
      };
    }
  }
);

export async function recommendServerConfig(input: RecommendServerConfigInput): Promise<RecommendServerConfigOutput> {
  return recommendServerConfigFlow(input);
}
