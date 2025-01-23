'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="space-y-4 text-center text-white">
			<h2>Something went wrong</h2>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
