import { ReactNode } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth } from '@/server/providers/auth';

import AvatarBox from '@/components/avatar-box';

type TProps = {
	children: ReactNode;
};

export default async function DashboardLayout({ children }: TProps) {
	const session = await auth();

	if (!session) {
		redirect('/');
	}

	return (
		<article>
			<section className="relative flex h-[290px] w-full items-end">
				<Image
					src="/bg-profile.jpg"
					alt="bg"
					fill
					className="object-contain object-top sm:object-cover"
				/>
				<div className="container">
					<AvatarBox
						name={session.user.name}
						image={session.user.image}
					/>
				</div>
			</section>
			{children}
		</article>
	);
}
