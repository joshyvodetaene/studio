export interface VpnServer {
  id: string;
  name: string;
  endpoint: string;
  publicKey: string;
  country: string;
  city: string;
  load: number;
  latency: number;
  supportsUdp: boolean;
  supportsTcpTunnel: boolean;
  isActive: boolean;
}

export const MOCK_SERVERS: VpnServer[] = [
  {
    id: 'ch-zrh-1',
    name: 'Zurich #1',
    endpoint: 'vpn.ch1.torvpn.com:51820',
    publicKey: 'Xp9Z...s8L0=',
    country: 'CH',
    city: 'Zurich',
    load: 42,
    latency: 12,
    supportsUdp: true,
    supportsTcpTunnel: true,
    isActive: true,
  },
  {
    id: 'de-fra-2',
    name: 'Frankfurt #2',
    endpoint: 'vpn.de2.torvpn.com:51820',
    publicKey: 'Yq2B...m1N5=',
    country: 'DE',
    city: 'Frankfurt',
    load: 65,
    latency: 18,
    supportsUdp: true,
    supportsTcpTunnel: true,
    isActive: true,
  },
  {
    id: 'us-nyc-1',
    name: 'New York #1',
    endpoint: 'vpn.ny1.torvpn.com:51820',
    publicKey: 'Zk4M...p9R2=',
    country: 'US',
    city: 'New York',
    load: 25,
    latency: 85,
    supportsUdp: true,
    supportsTcpTunnel: false,
    isActive: true,
  },
  {
    id: 'jp-nrt-1',
    name: 'Tokyo #1',
    endpoint: 'vpn.jp1.torvpn.com:51820',
    publicKey: 'Wv7S...k3Q1=',
    country: 'JP',
    city: 'Tokyo',
    load: 88,
    latency: 240,
    supportsUdp: true,
    supportsTcpTunnel: true,
    isActive: true,
  },
];

export interface DeviceStatus {
  id: string;
  name: string;
  platform: 'linux' | 'windows' | 'macos' | 'ios' | 'android';
  isConnected: boolean;
  lastSeen: string;
}

export const MOCK_DEVICES: DeviceStatus[] = [
  { id: 'dev-1', name: 'MacBook Pro', platform: 'macos', isConnected: true, lastSeen: new Date().toISOString() },
  { id: 'dev-2', name: 'iPhone 15', platform: 'ios', isConnected: false, lastSeen: new Date(Date.now() - 3600000).toISOString() },
  { id: 'dev-3', name: 'Work Station', platform: 'linux', isConnected: true, lastSeen: new Date().toISOString() },
];