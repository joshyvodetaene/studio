
'use client';
/**
 * @fileOverview Genkit flow for AI-driven tunnel configuration.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { PRODUCTION_SERVERS } from '@/lib/server-data';

const TunnelConfigInputSchema = z.object({
  userIntent: z.string().describe('The user\'s goal (e.g., "Safe streaming", "Maximum stealth").'),
});
export type TunnelConfigInput = z.infer<typeof TunnelConfigInputSchema>;

const TunnelConfigOutputSchema = z.object({
  recommendedServerId: z.string(),
  hops: z.number().min(1).max(3),
  mtu: z.number(),
  splitTunneling: z.boolean(),
  dnsOverHttps: z.boolean(),
  explanation: z.string(),
});
export type TunnelConfigOutput = z.infer<typeof TunnelConfigOutputSchema>;

export const configureTunnelPrompt = ai.definePrompt({
  name: 'configureTunnelPrompt',
  input: { schema: TunnelConfigInputSchema },
  output: { schema: TunnelConfigOutputSchema },
  prompt: `You are the Torro Neural Engine, a Cyber-Security AI.
Analyze the user's intent and provide the optimal WireGuard/Tor configuration.

User Intent: "{{{userIntent}}}"

Available Infrastructure:
${JSON.stringify(PRODUCTION_SERVERS)}

Rules:
- High Stealth: 3 Hops, low MTU (1280), no split tunneling.
- High Speed/Streaming: 1-2 Hops, high MTU (1420), split tunneling enabled.
- Normal/Balanced: 2 Hops, MTU 1380.

Return a JSON config with recommendedServerId, hops, mtu, splitTunneling, dnsOverHttps, and a short explanation.`,
});

// Note: In a static build environment, we call the prompt directly from the client.
export async function configureTunnel(input: TunnelConfigInput): Promise<TunnelConfigOutput> {
  try {
    const { output } = await configureTunnelPrompt(input);
    return output!;
  } catch (error) {
    // Fallback logic for offline/static build scenarios
    const intent = input.userIntent.toLowerCase();
    if (intent.includes('stealth') || intent.includes('hidden')) {
      return {
        recommendedServerId: 'node-ch-infomaniak',
        hops: 3,
        mtu: 1280,
        splitTunneling: false,
        dnsOverHttps: true,
        explanation: "Stealth-Modus aktiviert: Maximale Anonymität durch 3 Hops und reduzierte Paketgröße zur Vermeidung von DPI (Deep Packet Inspection).",
      };
    }
    return {
      recommendedServerId: 'node-de-torservers',
      hops: 2,
      mtu: 1420,
      splitTunneling: true,
      dnsOverHttps: true,
      explanation: "Optimierte Standardkonfiguration für sicheres Browsing und hohen Durchsatz.",
    };
  }
}
