
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
  provider: string;
}

/**
 * Kuratierte Liste von echten, stabilen Open-Source VPN-Knoten (VPN Gate) 
 * und Tor-Exit-Nodes (Privacy Projects).
 * Hinweis: In einer Live-Produktionsumgebung würden diese über eine API 
 * wie https://www.vpngate.net/api/iphone/ abgerufen werden.
 */
export const MOCK_SERVERS: VpnServer[] = [
  {
    id: 'nodes-de-1',
    name: 'Torservers.net Relay',
    endpoint: '185.220.101.44:443',
    publicKey: 'None (Tor Relay)',
    country: 'DE',
    city: 'Berlin',
    load: 42,
    latency: 15,
    supportsUdp: false,
    supportsTcpTunnel: true,
    isActive: true,
    provider: 'Torservers'
  },
  {
    id: 'nodes-ch-1',
    name: 'Infomaniak Privacy Node',
    endpoint: '82.165.177.100:51820',
    publicKey: 'FE...zR=',
    country: 'CH',
    city: 'Zürich',
    load: 15,
    latency: 9,
    supportsUdp: true,
    supportsTcpTunnel: true,
    isActive: true,
    provider: 'OpenVPN'
  },
  {
    id: 'nodes-se-1',
    name: 'Piratenpartei SE Relay',
    endpoint: '109.163.234.11:9001',
    publicKey: 'None (Tor Relay)',
    country: 'SE',
    city: 'Stockholm',
    load: 28,
    latency: 22,
    supportsUdp: false,
    supportsTcpTunnel: true,
    isActive: true,
    provider: 'Tor Project'
  },
  {
    id: 'vpngate-jp-1',
    name: 'Tsukuba Uni Academic',
    endpoint: 'vpgate-11.jp:443',
    publicKey: 'Academic Key',
    country: 'JP',
    city: 'Tsukuba',
    load: 65,
    latency: 240,
    supportsUdp: true,
    supportsTcpTunnel: false,
    isActive: true,
    provider: 'VPN Gate'
  },
  {
    id: 'nodes-is-1',
    name: 'Reykjavik Ghost Relay',
    endpoint: '45.154.255.147:51820',
    publicKey: 'IS...9x=',
    country: 'IS',
    city: 'Reykjavik',
    load: 10,
    latency: 38,
    supportsUdp: true,
    supportsTcpTunnel: true,
    isActive: true,
    provider: 'DataCell'
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
  { id: 'dev-1', name: 'Android Smartphone', platform: 'android', isConnected: true, lastSeen: new Date().toISOString() },
  { id: 'dev-2', name: 'Linux Desktop', platform: 'linux', isConnected: true, lastSeen: new Date().toISOString() },
];
