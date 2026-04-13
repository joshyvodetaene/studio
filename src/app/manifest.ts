
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Torro — Secure Portal',
    short_name: 'Torro PRO',
    description: 'Standalone High-Performance Tor-optimized VPN Portal',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#000000',
    theme_color: '#991b1b',
    icons: [
      {
        src: 'https://picsum.photos/seed/torro-icon-pro/192/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://picsum.photos/seed/torro-icon-pro/512/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Quick Connect',
        short_name: 'Connect',
        description: 'Sofortige Tunnel-Aktivierung',
        url: '/widget?action=connect',
        icons: [{ src: 'https://picsum.photos/seed/torro-conn/192/192', sizes: '192x192' }]
      },
      {
        name: 'Node Status',
        short_name: 'Status',
        description: 'Netzwerk-Integrität prüfen',
        url: '/',
        icons: [{ src: 'https://picsum.photos/seed/torro-stat/192/192', sizes: '192x192' }]
      }
    ],
    categories: ['utilities', 'security'],
  }
}
