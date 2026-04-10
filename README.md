# Torro — High-Performance Tor-optimized VPN Portal

Torro ist ein modernes, standalone Privacy-Portal, das für maximale Anonymität und hohen Durchsatz entwickelt wurde. Es nutzt eine Kombination aus Tor-Multi-Hop-Routing und Hochgeschwindigkeits-Endpunkten.

## 🚀 Wie lade ich das Projekt herunter?

Da dieses Projekt gerade in einer KI-Umgebung erstellt wurde, ist der beste Weg:

1. **Push zu GitHub**: Nutze die Befehle unten, um den Code in dein Repository zu laden.
2. **Download von GitHub**: Gehe auf deine GitHub-Seite (`https://github.com/joshyvodetaene/torro`) und klicke auf **Code > Download ZIP**.
3. **Alternativ**: Falls du Git installiert hast, nutze `git clone https://github.com/joshyvodetaene/torro.git`.

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

## 📱 GitHub Workflows (Automatischer APK Build)

Nachdem du den Code zu GitHub gepusht hast, passiert folgendes automatisch:
- **Build**: GitHub baut bei jedem Push eine APK. Du findest sie unter dem Tab **"Actions"** beim jeweiligen Build unter **"Artifacts"**.
- **Release**: Erstelle ein Tag, um automatisch einen offiziellen Release mit der fertigen APK zu erstellen:
  ```bash
  git tag v1.0.0
  git push origin v1.0.0
  ```

## 📂 Git Befehle (Projekt zu GitHub hochladen)

Öffne dein **Terminal** im Projektordner und führe diese Befehle aus:

```bash
# 1. Git initialisieren
git init

# 2. Dateien hinzufügen
git add .

# 3. Ersten Commit erstellen
git commit -m "Initial commit: Torro Production Ready"

# 4. Branch umbenennen
git branch -M main

# 5. Dein GitHub Repository verknüpfen
git remote add origin https://github.com/joshyvodetaene/torro.git

# 6. Code hochladen (Push)
git push -u origin main
```

## ⚖️ Lizenz
Open Source unter der MIT-Lizenz.
