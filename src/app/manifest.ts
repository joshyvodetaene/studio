import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TorVPN Pro',
    short_name: 'TorVPN',
    description: 'Standalone Secure VPN Portal',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A1429',
    theme_color: '#47D0EB',
    icons: [
      {
        src: 'https://picsum.photos/seed/torvpn-icon/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/torvpn-icon/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
