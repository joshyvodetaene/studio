
# Torro — High-Performance Tor-optimized VPN Portal

Torro ist ein modernes, standalone Privacy-Portal, das für maximale Anonymität und hohen Durchsatz entwickelt wurde.

## 🚀 WICHTIG: VPN-Symbol in der Statusleiste (Android APK)

Damit das **VPN-Symbol (Schlüssel)** in der Android-Statusleiste erscheint, musst du nach dem Download des Projekts (`git clone` oder ZIP) folgendes tun:

1. **Android Projekt initialisieren**:
   ```bash
   npx cap add android
   ```
2. **VpnService deklarieren**:
   Öffne `android/app/src/main/AndroidManifest.xml` und füge innerhalb des `<application>` Tags folgendes hinzu:
   ```xml
   <service android:name=".MyVpnService"
            android:permission="android.permission.BIND_VPN_SERVICE"
            android:exported="false">
       <intent-filter>
           <action android:name="android.net.VpnService"/>
       </intent-filter>
   </service>
   ```
3. **Native Komponente**:
   Du musst eine kleine Java-Klasse `MyVpnService.java` erstellen, die von `android.net.VpnService` erbt. Eine Vorlage findest du in der Android-Entwicklerdokumentation.

## 🛠️ Lokale Installation (nach dem Download)

1. Öffne ein Terminal im Ordner `torro`.
2. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```
3. Starte den Entwicklungsmodus:
   ```bash
   npm run dev
   ```

## 📂 Wo finde ich was?

- `src/ai/flows`: Die intelligente Tunnel-Konfiguration (Neural Engine).
- `src/app/widget`: Die dedizierte Widget-Ansicht für den Startbildschirm.
- `src/lib/services`: Der Background-Service für die System-Persistenz.

Viel Erfolg mit Torro PRO!
