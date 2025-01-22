import { ReactNode } from 'react';

type TProps = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: TProps) {
	return <div className="h-[100vh] bg-amber-100">{children}</div>;
}
