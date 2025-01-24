import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<article className="flex flex-col gap-7 text-center text-white">
			<div className="text-9xl">404</div>
			<div className="text-2xl">Page not found</div>
			<Link href="/">
				<Button>Go to main page</Button>
			</Link>
		</article>
	);
}
