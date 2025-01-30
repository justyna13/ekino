import { ReactNode } from 'react';

type TProps = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: TProps) {
	return <div>{children}</div>;
}
