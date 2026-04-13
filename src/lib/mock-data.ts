import { PRODUCTION_SERVERS, VpnServer, DeviceStatus } from './server-data';

/**
 * Re-Export der realen Produktionsdaten zur Wahrung der Kompatibilität.
 */
export const MOCK_SERVERS = PRODUCTION_SERVERS;
export type { VpnServer, DeviceStatus };
export { PRODUCTION_SERVERS };
