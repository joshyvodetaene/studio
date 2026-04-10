import { PRODUCTION_SERVERS, VpnServer, DeviceStatus } from './server-data';

/**
 * Re-Export für Kompatibilität, aber Nutzung der realen Produktionsdaten.
 */
export const MOCK_SERVERS = PRODUCTION_SERVERS;
export type { VpnServer, DeviceStatus };
export { PRODUCTION_SERVERS };
