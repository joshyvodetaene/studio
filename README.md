# Torro — High-Performance Tor-optimized VPN Portal

Torro ist ein modernes, standalone Privacy-Portal, das für maximale Anonymität und hohen Durchsatz entwickelt wurde. Es nutzt eine Kombination aus Tor-Multi-Hop-Routing und Hochgeschwindigkeits-Endpunkten.

## Features
- **Standalone APK**: Optimiert für den Einsatz auf Android via Capacitor.
- **Neural Config Engine**: KI-gestützte Auswahl der optimalen Server-Konfiguration (mit intelligentem Offline-Fallback).
- **Onion-Optimiert**: Fokus auf Anonymität durch Multi-Hop-Analysen und reale Tor-Knoten.
- **High Performance**: Unterstützung für 10Gbps+ Backbones und Echtzeit-Durchsatzanzeige.
- **GitHub Actions**: Automatisierte APK-Builds direkt bei jedem Push.

## Veröffentlichung auf GitHub (Schritt für Schritt)

Öffne dein **Terminal** (z. B. in VS Code mit `Strg + ö` oder `Cmd + J`) im Projektordner und führe diese Befehle aus:

```bash
# 1. Git initialisieren
git init

# 2. Dateien hinzufügen
git add .

# 3. Ersten Commit erstellen
git commit -m "Initial commit: Torro Production Ready"

# 4. Branch umbenennen
git branch -M main

# 5. Remote Repository verknüpfen
git remote add origin https://github.com/joshyvodetaene/torro.git

# 6. Code hochladen (Push)
git push -u origin main
```

## GitHub Workflows (CI/CD)
Nach dem Push baut GitHub automatisch die APK für dich:
- **Build**: Jedes Mal, wenn du Code in den `main` Branch pushst, wird eine APK unter dem Tab **"Actions"** als Artifact gespeichert.
- **Release**: Erstelle ein Tag, um automatisch einen offiziellen Release mit der fertigen APK zu erstellen:
  ```bash
  git tag v1.0.0
  git push origin v1.0.0
  ```

## Lokal für Android bauen
Falls du lokal bauen möchtest:
1. `npm run static-build`
2. `npx cap sync android`
3. `npx cap open android` (Öffnet Android Studio)

## Lizenz
Open Source unter der MIT-Lizenz.
