'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/toaster';

type TProps = {
	children: ReactNode;
};

export default function Providers({ children }: TProps) {
	return (
		<SessionProvider>
			{children}
			<Toaster />
		</SessionProvider>
	);
}
