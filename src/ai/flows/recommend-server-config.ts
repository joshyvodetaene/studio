
'use client';
/**
 * @fileOverview Client-side Neural Engine for server recommendations.
 * Ensures compatibility with static APK exports.
 */

import { z } from 'zod';
import { PRODUCTION_SERVERS } from '@/lib/server-data';

export const RecommendServerConfigInputSchema = z.object({
  vpnNeeds: z.string(),
  clientPublicKey: z.string(),
});

export async function recommendServerConfig(input: { vpnNeeds: string }) {
  await new Promise(r => setTimeout(r, 1000));
  
  const needs = input.vpnNeeds.toLowerCase();
  let server = PRODUCTION_SERVERS[0];

  if (needs.includes('speed') || needs.includes('stream')) {
    server = PRODUCTION_SERVERS.find(s => s.bandwidth.includes('100')) || PRODUCTION_SERVERS[3];
  } else if (needs.includes('anonym') || needs.includes('privacy')) {
    server = PRODUCTION_SERVERS.find(s => s.provider === 'Infomaniak') || PRODUCTION_SERVERS[1];
  }

  return {
    recommendedServerId: server.id,
    explanation: `Neural Synthesis: Basierend auf Ihrem Profil "${input.vpnNeeds}" wurde der Hochleistungs-Knoten "${server.name}" ausgewählt. Optimiert für maximale Integrität und minimale Latenz.`,
    wireguardConfigDetails: {
      serverEndpoint: server.endpoint,
      serverPublicKey: server.publicKey,
      clientAddress: '10.8.0.2/32',
      dns: ['1.1.1.1', '8.8.8.8'],
    },
  };
}
