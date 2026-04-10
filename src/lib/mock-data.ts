export interface VpnServer {
  id: string;
  name: string;
  endpoint: string;
  publicKey: string;
  country: string;
  city: string;
  load: number;
  latency: number;
  bandwidth: string; // Neu: Max Bandbreite
  supportsUdp: boolean;
  supportsTcpTunnel: boolean;
  isActive: boolean;
  provider: string;
}

/**
 * Kuratierte Liste von High-Performance Open-Source VPN-Knoten und Tor-Exit-Nodes.
 * Optimiert auf Durchsatz und Latenz.
 */
export const MOCK_SERVERS: VpnServer[] = [
  {
    id: 'perf-de-1',
    name: 'Berlin High-Speed Core',
    endpoint: '185.220.101.44:443',
    publicKey: 'None (Tor High-Perf)',
    country: 'DE',
    city: 'Berlin',
    load: 12,
    latency: 8,
    bandwidth: '10 Gbps',
    supportsUdp: true,
    supportsTcpTunnel: true,
    isActive: true,
    provider: 'Torservers'
  },
  {
    id: 'perf-ch-1',
    name: 'Zurich Ultra-Low Latency',
    endpoint: '82.165.177.100:51820',
    publicKey: 'FE...zR=',
    country: 'CH',
    city: 'Zürich',
    load: 5,
    latency: 4,
    bandwidth: '40 Gbps',
    supportsUdp: true,
    supportsTcpTunnel: true,
    isActive: true,
    provider: 'Infomaniak'
  },
  {
    id: 'perf-se-1',
    name: 'Stockholm Gigabit Relay',
    endpoint: '109.163.234.11:9001',
    publicKey: 'None (Tor Gigabit)',
    country: 'SE',
    city: 'Stockholm',
    load: 18,
    latency: 14,
    bandwidth: '1 Gbps',
    supportsUdp: false,
    supportsTcpTunnel: true,
    isActive: true,
    provider: 'Piratenpartei'
  },
  {
    id: 'perf-is-1',
    name: 'Reykjavik Deep-Sea Fiber',
    endpoint: '45.154.255.147:51820',
    publicKey: 'IS...9x=',
    country: 'IS',
    city: 'Reykjavik',
    load: 2,
    latency: 28,
    bandwidth: '100 Gbps',
    supportsUdp: true,
    supportsTcpTunnel: true,
    isActive: true,
    provider: 'DataCell'
  },
  {
    id: 'perf-jp-1',
    name: 'Tokyo Academic Backbone',
    endpoint: 'vpgate-11.jp:443',
    publicKey: 'Academic-Gbit',
    country: 'JP',
    city: 'Tsukuba',
    load: 45,
    latency: 180,
    bandwidth: '10 Gbps',
    supportsUdp: true,
    supportsTcpTunnel: false,
    isActive: true,
    provider: 'VPN Gate'
  }
];

export interface DeviceStatus {
  id: string;
  name: string;
  platform: 'linux' | 'windows' | 'macos' | 'ios' | 'android';
  isConnected: boolean;
  lastSeen: string;
}

export const MOCK_DEVICES: DeviceStatus[] = [
  { id: 'dev-1', name: 'Android Pixel 8 Pro', platform: 'android', isConnected: true, lastSeen: new Date().toISOString() },
  { id: 'dev-2', name: 'MacBook Pro (M3)', platform: 'macos', isConnected: true, lastSeen: new Date().toISOString() },
];
