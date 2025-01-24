import { ReactNode } from 'react';
import Link from 'next/link';

import Heading from '@/components/ui/heading';

type TProps = {
	children: ReactNode;
};

export default function BlogLayout({ children }: TProps) {
	return (
		<article className="prose prose-invert mx-auto xl:prose-xl">
			<Heading tag="h2" variant="h1" className="text-center">
				Heading
			</Heading>
			{children}
			<section>
				<Heading>Articles links</Heading>
				<ul>
					<li>
						<Link href="/">Blog główna</Link>
					</li>
					<li>
						<Link href="/blog/aio-review">Aio's review</Link>
					</li>
					<li>
						<Link href="/blog/coffee-pros-and-cons">
							Coffee Pros & Cons
						</Link>
					</li>
					<li>
						<Link href="/blog/history">Movies history</Link>
					</li>
				</ul>
			</section>
		</article>
	);
}
