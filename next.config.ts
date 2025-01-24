import type { NextConfig } from 'next';
import nextMDX from '@next/mdx';

const withMDX = nextMDX({
	extension: /\.mdx$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

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
	pageExtensions: ['mdx', 'ts', 'tsx'],
	experimental: {
		mdxRs: true,
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

export default withMDX(nextConfig);
