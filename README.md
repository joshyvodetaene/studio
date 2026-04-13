# Torro PRO — High-Performance VPN & Privacy Portal

Torro PRO ist jetzt vollständig automatisiert. Der VPN-Tunnel arbeitet auf Systemebene und wird nach der Installation der APK automatisch vom Android-Betriebssystem registriert.

## 🚀 Automatisierter APK Build (Empfohlen)

Das Projekt enthält eine **GitHub Action**, die alles für dich erledigt:
1. Push deinen Code auf GitHub.
2. Gehe zum Tab **Actions**.
3. Lade die fertige `torro-debug-apk` herunter.
Diese APK enthält bereits alle nativen Komponenten für das **VPN-Symbol (Schlüssel)** in der Statusleiste.

## 🛠️ Lokaler Build (Manuell)

Falls du die APK lokal auf deinem Rechner bauen möchtest:

1. **Voraussetzungen**: Android Studio & JDK 17 installiert.
2. **Native Prepare**:
   ```bash
   npm run android:prepare
   ```
   *Dieser Befehl erstellt automatisch die `MyVpnService.java` und modifiziert die `AndroidManifest.xml`.*
3. **Build**:
   ```bash
   cd android && ./gradlew assembleDebug
   ```

## 📂 Features

- **Neural Synthesis Engine**: KI-gestützte Tunnel-Optimierung.
- **Wine Red Stealth UI**: Maximale Dunkelheit für minimale Entdeckung.
- **System-Wide Protection**: Der Tunnel schützt alle Apps auf deinem Gerät.
- **Persistent Service**: Schutz bleibt aktiv, auch wenn die App geschlossen ist.

Viel Erfolg mit Torro PRO!