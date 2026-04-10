# Torro — High-Performance Tor-optimized VPN Portal

Torro ist ein modernes, standalone Privacy-Portal, das für maximale Anonymität und hohen Durchsatz entwickelt wurde. Es nutzt eine Kombination aus Tor-Multi-Hop-Routing und Hochgeschwindigkeits-Endpunkten.

## Features
- **Standalone APK**: Optimiert für den Einsatz auf Android via Capacitor.
- **Neural Config Engine**: KI-gestützte Auswahl der optimalen Server-Konfiguration (mit intelligentem Offline-Fallback).
- **Onion-Optimiert**: Fokus auf Anonymität durch Multi-Hop-Analysen und reale Tor-Knoten.
- **High Performance**: Unterstützung für 10Gbps+ Backbones und Echtzeit-Durchsatzanzeige.
- **GitHub Actions**: Automatisierte APK-Builds direkt bei jedem Push.

## Installation & Deployment (GitHub)

Um den Code in dein Repository zu pushen und die automatische APK-Erstellung zu starten, führe diese Befehle in deinem Terminal aus:

```bash
git init
git add .
git commit -m "Initial commit: Torro Production Ready"
git branch -M main
git remote add origin https://github.com/joshyvodetaene/torro.git
git push -u origin main
```

## GitHub Workflows (CI/CD)
Das Projekt ist so vorkonfiguriert, dass GitHub Actions die APK für dich baut:
- **Build**: Jedes Mal, wenn du Code in den `main` Branch pushst, wird eine APK unter "Actions" als Artifact gespeichert.
- **Release**: Erstelle ein Tag, um automatisch einen GitHub Release mit der fertigen APK zu erstellen:
  ```bash
  git tag v1.0.0
  git push origin v1.0.0
  ```

## Lizenz
Open Source unter der MIT-Lizenz.
