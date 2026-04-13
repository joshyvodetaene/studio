
'use client';

import { App } from '@capacitor/app';

/**
 * Persistenz-Engine für den systemweiten VPN-Tunnel.
 * Diese Klasse fungiert als Brücke zwischen der Web-UI und dem nativen Android VpnService.
 */
class VpnBackgroundService {
  private static instance: VpnBackgroundService;
  private isTunnelActive: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initListeners();
    }
  }

  public static getInstance(): VpnBackgroundService {
    if (!VpnBackgroundService.instance) {
      VpnBackgroundService.instance = new VpnBackgroundService();
    }
    return VpnBackgroundService.instance;
  }

  private initListeners() {
    try {
      // Überwacht App-Status Änderungen für Foreground-Service Erhalt
      App.addListener('appStateChange', ({ isActive }) => {
        if (!isActive && this.isTunnelActive) {
          console.log('[VPN-CORE] App im Hintergrund. System-Level Tunnel bleibt aktiv.');
        }
      });
    } catch (e) {
      console.warn('Capacitor Plugins im aktuellen Kontext nicht aktiv.');
    }
  }

  /**
   * Aktiviert den persistenten Tunnel-Modus.
   * Sendet den Aktivierungsbefehl an die native Android-Bridge.
   */
  public async activateTunnel() {
    this.isTunnelActive = true;
    console.log('[VPN-CORE] System-Handshake: Starte VpnService...');
    
    // HINWEIS FÜR DEN NUTZER:
    // In der finalen APK wird hier über ein Capacitor-Plugin oder ein Custom Native Script
    // der Befehl 'startService' an den Android VpnService gesendet.
    // Dies löst das VPN-Symbol in der Statusleiste aus.
    
    if ((window as any).Capacitor?.Plugins?.VpnService) {
      await (window as any).Capacitor.Plugins.VpnService.start();
    }
  }

  /**
   * Deaktiviert den Tunnel und entfernt das VPN-Symbol aus der Statusleiste.
   */
  public async deactivateTunnel() {
    this.isTunnelActive = false;
    console.log('[VPN-CORE] System-Handshake: Stoppe VpnService...');
    
    if ((window as any).Capacitor?.Plugins?.VpnService) {
      await (window as any).Capacitor.Plugins.VpnService.stop();
    }
  }

  public isActive(): boolean {
    return this.isTunnelActive;
  }
}

export const vpnBackgroundService = VpnBackgroundService.getInstance();
