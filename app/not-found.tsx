import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<article className="text-white text-center flex flex-col gap-7">
			<div className="text-9xl">404</div>
			<div className="text-2xl">Page not found</div>
			<Link href="/">
				<Button>Go to main page</Button>
			</Link>
		</article>
	)
}
