import { ReactNode } from 'react';

type TProps = {
	children: ReactNode;
}

export default function DashboardLayout({children}: TProps) {
	return (
		<div className="bg-amber-100 h-[100vh]">
			{children}
		</div>
	)
}
