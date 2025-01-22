import type { Metadata } from 'next';

import './globals.css';
import { cn } from '@/utils/lib/tailwind';
import { Inter as FontSans } from 'next/font/google';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
	title: 'Ekino app',
	description: 'Ekino app to search and rate movies',
};

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans"
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(
				'min-h-screen bg-foreground font-sans antialiased',
				fontSans
			)}>
			<Header />
			<main>{children}</main>
			</body>
		</html>
	);
}
