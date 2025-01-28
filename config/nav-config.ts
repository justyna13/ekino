import { Icons } from '@/components/icons/icons';

type TNavConfig = {
	label: string;
	slug: string;
	icon: keyof typeof Icons;
	layoutSegment?: string;
	visibility?: 'guest' | 'authorized';
	type?: 'logout';
}[];

export const navConfig: TNavConfig = [
	{
		label: 'Strona główna',
		slug: '/',
		icon: 'home',
	},
	{
		label: 'Filmy i seriale',
		slug: '/search',
		icon: 'camera',
		layoutSegment: 'movies',
	},
	{
		label: 'Blog',
		slug: '/blog',
		icon: 'bookOpen',
		layoutSegment: 'blog',
	},
	{
		label: 'Login',
		slug: '/login',
		icon: 'key',
		visibility: 'guest',
	},
	{
		label: 'My account',
		slug: '/my-account',
		icon: 'person',
		visibility: 'authorized',
	},
	{
		label: '',
		slug: '/logout',
		icon: 'logout',
		type: 'logout',
		visibility: 'authorized',
	},
];
