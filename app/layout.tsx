import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
	title: 'Ekino app',
	description: 'Ekino app to search and rate movies',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
