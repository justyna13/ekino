import type { Metadata } from 'next';

import './globals.css';

import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/utils/lib/tailwind';

import Header from '@/components/layout/header';

export const metadata: Metadata = {
	title: {
		absolute: 'E-kino',
		template: '%s | E-kino',
	},
	description: 'Ekino app to search, rate and buy movies',
	keywords: ['wypożyczalnia filmów', 'wypożyczalnia seriali', 'vod'],
};

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
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
					'min-h-screen bg-foreground font-sans antialiased',
					fontSans.variable,
				)}
			>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
