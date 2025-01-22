import { navConfig } from '@/config/nav-config';
import { Icons } from '@/components/icons/icons';
import Link from 'next/link';

export default function Menu() {
	const menuItems = navConfig.map(({icon, label, slug}) => {
		const Icon = Icons[icon];

		return (
			<Link key={label} href={slug} className="flex gap-2 hover:text-primary [&:hover>svg]:fill-primary">
				<Icon />{label}
			</Link>
		)
	});

	return (
		<nav className="text-white gap-5 xl:flex hidden">
			{menuItems}
		</nav>
	)
}
