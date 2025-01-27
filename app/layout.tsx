import type { Metadata } from 'next';

import './globals.css';

import { Poppins } from 'next/font/google';
import { cn } from '@/utils/lib/tailwind';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
	title: {
		absolute: 'E-kino',
		template: '%s | E-kino',
	},
	description: 'Ekino app to search, rate and buy movies-and-tv',
	keywords: ['wypożyczalnia filmów', 'wypożyczalnia seriali', 'vod'],
};

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['300', '400', '500', '700'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-foreground font-poppins antialiased',
					poppins.variable,
				)}
			>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
