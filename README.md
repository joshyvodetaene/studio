# Torro — High-Performance Tor-optimized VPN Portal

Torro ist ein modernes, standalone Privacy-Portal, das für maximale Anonymität und hohen Durchsatz entwickelt wurde. Es nutzt eine Kombination aus Tor-Multi-Hop-Routing und Hochgeschwindigkeits-Endpunkten.

## 🚀 Wie lade ich das Projekt auf meinen PC?

Da du dich gerade in der Cloud-Umgebung befindest, ist der beste Weg über GitHub:

1. **Terminal öffnen**: Klicke unten in Firebase Studio auf das **Terminal**.
2. **Git Befehle eingeben**: Kopiere diese Zeilen und füge sie nacheinander ein:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Torro Production Ready"
   git branch -M main
   git remote add origin https://github.com/joshyvodetaene/torro.git
   git push -u origin main
   ```
3. **Download**: Gehe jetzt in deinem Browser auf `https://github.com/joshyvodetaene/torro`. Dort kannst du auf **Code > Download ZIP** klicken, um alles auf deinen Computer zu laden.

## 🛠️ Lokale Installation (nach dem Download)

Wenn du das Projekt auf deinem Computer hast:

1. Öffne ein Terminal im Ordner `torro`.
2. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```
3. Starte den Entwicklungsmodus:
   ```bash
   npm run dev
   ```
4. Öffne `http://localhost:9002` in deinem Browser.

## 📱 GitHub Actions (Automatische APK)

Sobald du den Code zu GitHub gepusht hast (Schritt oben), passiert folgendes:
- **Build**: GitHub baut automatisch deine APK. Du findest sie unter dem Tab **"Actions"** beim jeweiligen Build unter **"Artifacts"**.
- **Release**: Wenn du ein Tag erstellst, wird ein offizieller Release erstellt:
  ```bash
  git tag v1.0.0
  git push origin v1.0.0
  ```

## 📂 Wo finde ich was in Firebase Studio?

- **Links**: Die Dateiliste (hier kannst du Dateien öffnen).
- **Unten**: Das Terminal (für Git-Befehle).
- **Mitte**: Der Code-Editor.

Viel Erfolg mit Torro!
