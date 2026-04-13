
import { MetadataRoute } from 'next'
import { PlaceHolderImages } from '@/lib/placeholder-images'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  const appIcon = PlaceHolderImages.find(img => img.id === 'app-icon')?.imageUrl || 'https://picsum.photos/seed/torro-pro-icon/512/512';

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
        src: appIcon,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: appIcon,
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
        icons: [{ src: appIcon, sizes: '192x192' }]
      },
      {
        name: 'Node Status',
        short_name: 'Status',
        description: 'Netzwerk-Integrität prüfen',
        url: '/',
        icons: [{ src: appIcon, sizes: '192x192' }]
      }
    ],
    categories: ['utilities', 'security'],
  }
}
