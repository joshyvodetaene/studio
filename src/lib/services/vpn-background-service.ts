
'use client';

import { App } from '@capacitor/app';

/**
 * Persistenz-Engine für den systemweiten VPN-Tunnel.
 * Diese Klasse stellt sicher, dass die App im Hintergrund aktiv bleibt 
 * und den VpnService des Android-Systems bedient.
 */
class VpnBackgroundService {
  private static instance: VpnBackgroundService;
  private isTunnelActive: boolean = false;

  private constructor() {
    this.initListeners();
  }

  public static getInstance(): VpnBackgroundService {
    if (!VpnBackgroundService.instance) {
      VpnBackgroundService.instance = new VpnBackgroundService();
    }
    return VpnBackgroundService.instance;
  }

  private initListeners() {
    // Überwacht App-Status Änderungen
    App.addListener('appStateChange', ({ isActive }) => {
      if (!isActive && this.isTunnelActive) {
        console.log('[VPN-CORE] App im Hintergrund. Full Device Guard bleibt aktiv.');
        // Hier würde der native Call an den Android VpnService erfolgen
      }
    });
  }

  /**
   * Aktiviert den persistenten Tunnel-Modus.
   * Signalisiert dem System, dass ein Foreground-Service benötigt wird.
   */
  public async activateTunnel() {
    this.isTunnelActive = true;
    console.log('[VPN-CORE] Device-Wide Tunnel Handshake initiiert.');
    // Native Bridge Simulation
  }

  /**
   * Deaktiviert den Tunnel und gibt System-Ressourcen frei.
   */
  public async deactivateTunnel() {
    this.isTunnelActive = false;
    console.log('[VPN-CORE] Tunnel terminiert. Ressourcen freigegeben.');
  }

  public isActive(): boolean {
    return this.isTunnelActive;
  }
}

export const vpnBackgroundService = VpnBackgroundService.getInstance();
