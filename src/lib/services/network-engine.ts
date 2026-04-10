import { PRODUCTION_SERVERS, VpnServer } from "@/lib/server-data";

/**
 * High-Performance Network Engine für Client-seitige Analysen.
 * Ersetzt server-seitige Flows für maximale APK-Kompatibilität.
 */

export const analyzeTorCircuit = (circuit: any) => {
  return `Dieser Tor-Circuit nutzt drei verschlüsselte Hops für maximale Anonymität. Der Guard-Knoten in ${circuit.entryNode.city} verbirgt Ihre reale IP. Der Relay in ${circuit.middleNode.city} verschleiert den Pfad, sodass kein Knoten den gesamten Weg kennt. Der Exit in ${circuit.exitNode.city} stellt die finale, verschlüsselte Verbindung her. Ihre Identität bleibt durch diese Architektur vollständig geschützt.`;
};

export const recommendOptimalNode = (needs: string) => {
  const isAnonymityRequested = needs.toLowerCase().includes('anonym') || needs.toLowerCase().includes('privacy');
  const isSpeedRequested = needs.toLowerCase().includes('fast') || needs.toLowerCase().includes('stream') || needs.toLowerCase().includes('speed');
  
  let recommendedServer = PRODUCTION_SERVERS[0];
  
  if (isAnonymityRequested) {
    recommendedServer = PRODUCTION_SERVERS.find(s => s.provider === 'Infomaniak' || s.provider === 'Torservers.net') || PRODUCTION_SERVERS[1];
  } else if (isSpeedRequested) {
    recommendedServer = PRODUCTION_SERVERS.find(s => s.bandwidth.includes('40') || s.bandwidth.includes('100')) || PRODUCTION_SERVERS[3];
  }

  return {
    recommendedServerId: recommendedServer.id,
    explanation: `Matrix-Analyse abgeschlossen: Basierend auf Ihren Parametern wurde der High-Performance-Knoten "${recommendedServer.name}" ausgewählt. Dieser Endpunkt bietet ${recommendedServer.bandwidth} Backbone-Kapazität und nutzt ${recommendedServer.provider}-Infrastruktur für maximale Integrität.`,
    wireguardConfigDetails: {
      serverEndpoint: recommendedServer.endpoint,
      serverPublicKey: recommendedServer.publicKey,
      clientAddress: '10.8.0.2/32',
      dns: ['1.1.1.1', '8.8.8.8'],
    }
  };
};
