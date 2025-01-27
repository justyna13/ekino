import Image from 'next/image';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="container">
			<Separator className="bg-white" />
			<div className="flex flex-col justify-between gap-5 py-12 lg:flex-row">
				<Link href="/" className="mr-auto">
					<Image
						src="/logo.svg"
						alt="testLogo"
						width={149}
						height={53}
						priority
						className="brightness-0 invert"
					/>
				</Link>
				<div className="text-white">
					eKino, {currentYear}. All rights reserved.
					<br />
					Images used just for example. No copying allowed.
				</div>
			</div>
		</footer>
	);
}
