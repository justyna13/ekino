'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/utils/lib/tailwind';
import { signOut, useSession } from 'next-auth/react';

import { navConfig } from '@/config/nav-config';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import Loader from '@/components/ui/loader';
import { Icons } from '@/components/icons/icons';

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// next/navigation jest nowe, next/router stare
// import { useRouter } from 'next/navigation';

export default function Menu() {
	const [open, setOpen] = useState(false);
	// const router = useRouter();
	const path = usePathname();
	const selectedLayoutSegment = useSelectedLayoutSegment();
	const { status } = useSession();

	const menuItems = navConfig.map(
		({ icon, label, slug, layoutSegment, type, visibility }) => {
			if (
				(visibility === 'guest' && status === 'authenticated') ||
				(visibility === 'authorized' && status === 'unauthenticated')
			) {
				return false;
			}

			if (
				(visibility === 'guest' || visibility === 'authorized') &&
				status === 'loading'
			) {
				return false;
			}

			const Icon = Icons[icon];
			let click = undefined;

			if (type === 'logout') {
				click = async () => {
					await signOut();
				};
			}

			return (
				<Link
					key={label}
					onClick={e => {
						if (click) {
							e.preventDefault();
							click();
						}
					}}
					href={slug}
					className={cn(
						'flex gap-2 hover:text-primary [&:hover>svg]:fill-primary',
						slug === path || layoutSegment === selectedLayoutSegment
							? 'text-primary [&>svg]:fill-primary'
							: '',
					)}
				>
					<Icon />
					{label}
				</Link>
			);
		},
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button
				variant={'outline'}
				size="icon"
				className="xl:hidden"
				onClick={() => setOpen(true)}
			>
				<Icons.menu />
			</Button>
			{/*<Select onValueChange={selectedVal => router.push(selectedVal)}>*/}
			{/*	<SelectTrigger className="fixed bottom-5 z-50 w-[500px]">*/}
			{/*		<SelectValue placeholder="Wybierz link" />*/}
			{/*	</SelectTrigger>*/}
			{/*	<SelectContent>*/}
			{/*		<SelectItem value="/">Strona główna</SelectItem>*/}
			{/*		<SelectItem value="/blog/">Blog</SelectItem>*/}
			{/*		<SelectItem value="/my-account">Moje konto</SelectItem>*/}
			{/*		<SelectItem value="/login">Logowanie</SelectItem>*/}
			{/*		<SelectItem value="/sign-up">Rejestracja</SelectItem>*/}
			{/*	</SelectContent>*/}
			{/*</Select>*/}
			{/*<div className="fixed bottom-32 z-50 w-[500px] space-x-5 bg-white p-5">*/}
			{/*	<Button onClick={() => router.refresh()}>Odśwież</Button>*/}
			{/*	<Button onClick={() => router.forward()}>Do przodu</Button>*/}
			{/*	<Button onClick={() => router.back()}>Do tyłu</Button>*/}
			{/*	<Button onClick={() => router.replace('/')}>Zastąp</Button>*/}
			{/*</div>*/}
			<nav className="hidden gap-5 text-white xl:flex">
				{menuItems}
				{status === 'loading' ? <Loader /> : ''}
			</nav>
			<DialogContent className="rounded-lg bg-foreground [&>button>svg]:stroke-white">
				<DialogHeader className="tex-xl font-medium tracking-wide text-white sm:text-center">
					Menu główne
				</DialogHeader>
				<div className="max-w-p400px]">
					<nav
						className="space-y-5 text-center text-white [&_a]:text-xl"
						onClick={() => setOpen(false)}
					>
						{menuItems}
						{status === 'loading' ? <Loader /> : ''}
					</nav>
				</div>
			</DialogContent>
		</Dialog>
	);
}
