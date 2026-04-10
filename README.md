# Torro — High-Performance Tor-optimized VPN Portal

Torro ist ein modernes, standalone Privacy-Portal, das für maximale Anonymität und hohen Durchsatz entwickelt wurde. Es nutzt eine Kombination aus Tor-Multi-Hop-Routing und Hochgeschwindigkeits-Endpunkten.

## Features
- **Standalone APK**: Optimiert für den Einsatz auf Android via Capacitor.
- **Neural Config Engine**: KI-gestützte Auswahl der optimalen Server-Konfiguration (mit intelligentem Offline-Fallback).
- **Onion-Optimiert**: Fokus auf Anonymität durch Multi-Hop-Analysen und reale Tor-Knoten.
- **High Performance**: Unterstützung für 10Gbps+ Backbones und Echtzeit-Durchsatzanzeige.
- **GitHub Actions**: Automatisierte APK-Builds direkt bei jedem Push.

## Installation (Entwickler)
1. `npm install`
2. `npm run static-build`
3. `npx cap add android` (nur beim ersten Mal)
4. `npx cap sync android`
5. Öffne den `android` Ordner in Android Studio für den APK-Build oder nutze die GitHub Actions.

## GitHub Workflows (CI/CD)
Das Projekt ist so vorkonfiguriert, dass GitHub Actions die APK für dich baut:
- **Build**: Jedes Mal, wenn du Code in den `main` Branch pushst, wird eine APK unter "Actions" als Artifact gespeichert.
- **Release**: Erstelle ein Tag (z.B. `git tag v1.0.0 && git push --tags`), um automatisch einen GitHub Release mit der fertigen APK zu erstellen.

## Wichtiger Hinweis für CI/CD
Damit die GitHub Actions funktionieren, solltest du sicherstellen, dass du den `android/` Ordner nach der Initialisierung (`npx cap add android`) in dein Repository hochlädst.

## Lizenz
Open Source unter der MIT-Lizenz.
