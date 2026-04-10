
'use client';
/**
 * @fileOverview Genkit flow for AI-driven tunnel configuration.
 * Optimiert für den Einsatz in statischen Client-Umgebungen (APK).
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

/**
 * Führt die Tunnel-Konfiguration durch.
 * Nutzt Genkit AI im Browser mit einem robusten Fallback für Offline-Szenarien.
 */
export async function configureTunnel(input: TunnelConfigInput): Promise<TunnelConfigOutput> {
  try {
    // Versuch, die KI-Analyse über Genkit durchzuführen
    const response = await ai.generate({
      prompt: `You are the Torro Neural Engine, a Cyber-Security AI.
Analyze the user's intent and provide the optimal WireGuard/Tor configuration.

User Intent: "${input.userIntent}"

Available Infrastructure:
${JSON.stringify(PRODUCTION_SERVERS)}

Rules:
- High Stealth: 3 Hops, low MTU (1280), no split tunneling.
- High Speed/Streaming: 1-2 Hops, high MTU (1420), split tunneling enabled.
- Normal/Balanced: 2 Hops, MTU 1380.

Return a JSON config with recommendedServerId, hops, mtu, splitTunneling, dnsOverHttps, and a short explanation.`,
      output: { schema: TunnelConfigOutputSchema }
    });

    if (!response.output) throw new Error('AI Synthesis failed');
    return response.output;
  } catch (error) {
    // Intelligente Fallback-Logik basierend auf Schlüsselwörtern (für Offline/Build-Phase)
    const intent = input.userIntent.toLowerCase();
    
    if (intent.includes('stealth') || intent.includes('anonym') || intent.includes('sicher')) {
      return {
        recommendedServerId: 'node-ch-infomaniak',
        hops: 3,
        mtu: 1280,
        splitTunneling: false,
        dnsOverHttps: true,
        explanation: "Neural Engine Sync: Stealth-Modus aktiviert. Maximale Hops und Paket-Fragmentierungsschutz für höchste Anonymität.",
      };
    }
    
    if (intent.includes('stream') || intent.includes('film') || intent.includes('schnell') || intent.includes('booster')) {
      return {
        recommendedServerId: 'node-is-datacell',
        hops: 1,
        mtu: 1420,
        splitTunneling: true,
        dnsOverHttps: true,
        explanation: "Neural Engine Sync: Performance-Modus. Minimale Hops für 4K-Streaming und maximale Bandbreite.",
      };
    }

    return {
      recommendedServerId: 'node-de-torservers',
      hops: 2,
      mtu: 1380,
      splitTunneling: true,
      dnsOverHttps: true,
      explanation: "Neural Engine Sync: Standard-Profil aktiv. Ausgewogene Balance zwischen Sicherheit und Geschwindigkeit.",
    };
  }
}
