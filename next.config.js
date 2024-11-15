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
	async redirects() {
		return [
			{
				source: '/admin',
				destination: 'https://jowadotca.wpcomstaging.com/wp-admin/index.php',
				permanent: true,
			},
		]
	}
}

module.exports = nextConfig
