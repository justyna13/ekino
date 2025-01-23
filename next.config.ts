import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				pathname: '/photos/**',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/movies',
				destination: '/search',
				permanent: false,
			},
			{
				source: '/movies/:type',
				destination: '/search',
				permanent: false,
			},
			// przekierowanie całej ścieżki
			// {
			// 	source: '/search/:slug',
			// 	destination: '/',
			// 	permanent: false
			// },
		];
	},
};

export default nextConfig;
