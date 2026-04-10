import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Torro — Secure Portal',
    short_name: 'Torro',
    description: 'Standalone High-Performance Tor-optimized VPN Portal',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0A1429',
    theme_color: '#47D0EB',
    icons: [
      {
        src: 'https://picsum.photos/seed/torro-icon/192/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://picsum.photos/seed/torro-icon/512/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['utilities', 'security'],
  }
}
