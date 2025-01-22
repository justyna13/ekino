import { Icons } from '@/components/icons/icons';

type TNavConfig = {
	label: string;
	slug: string;
	icon: keyof typeof Icons;
}[];

export const navConfig: TNavConfig = [
	{
		label: 'Strona główna',
		slug: '/',
		icon: 'home'
	},
	{
		label: 'Filmy i seriale',
		slug: '/search',
		icon: 'camera'
	},
	{
		label: 'Blog',
		slug: '/blog',
		icon: 'bookOpen'
	}
];
