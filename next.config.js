/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
        port: '',
      },
    ],
  },
  experimental: {
    turbo: {
      // ...
    },
  },
  async headers() {
    return [
      {
        source:
          '/:all*(svg|jpg|jpeg|png|gif|ico|webp|js|css|woff|woff2|ttf|otf|eot|svg|mp4|webm|ogg|pdf)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://jowadotca.wpcomstaging.com/wp-admin/index.php',
        permanent: true,
      },
      {
        source: '/wp-admin',
        destination: 'https://jowadotca.wpcomstaging.com/wp-admin/index.php',
        permanent: true,
      },
      {
        source: '/wiki',
        destination: 'https://github.com/mckennach/jowa-dev_2/wiki',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
