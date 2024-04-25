import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pluginium',
    short_name: 'Pluginium',
    description: 'Pluginium Web App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
