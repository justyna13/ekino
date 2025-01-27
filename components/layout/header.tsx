import Image from 'next/image';
import Link from 'next/link';

import Breadcrumb from '@/components/layout/breadcrumb';
import Menu from '@/components/layout/menu';

export default function Header() {
	return (
		<>
			<header className="fixed top-0 z-50 w-full bg-foreground py-3">
				<div className="container flex max-w-[500px] flex-wrap items-center justify-end gap-3 xl:max-w-screen-xl xl:gap-7">
					<Link href="/" className="mr-auto" />
					<Image
						src="/logo.svg"
						alt="testLogo"
						width={149}
						height={53}
						priority
					/>
					<Menu />
				</div>
			</header>
			<div className="h-[129px] xl:h-[77px]"></div>
			<Breadcrumb />
		</>
	);
}
