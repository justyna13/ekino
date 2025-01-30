import { cn } from '@/utils/lib/tailwind';
import { getNameInitials } from '@/utils/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Heading from '@/components/ui/heading';

type TProps = {
	name?: string | null;
	image?: string | null;
	className?: string;
	isHeadingVisible?: boolean;
};

export default function AvatarBox({
	name,
	image,
	className,
	isHeadingVisible = true,
}: TProps) {
	const nameInitials = name ? getNameInitials(name) : 'EK';

	return (
		<div className="relative flex flex-col items-center gap-6 sm:flex-row">
			<Avatar
				className={cn('size-36 border-2 border-primary', className)}
			>
				<AvatarImage src={image || ''} alt={name ?? ''} />
				<AvatarFallback className="bg-foreground text-5xl text-primary">
					{!image ? nameInitials : null}
				</AvatarFallback>
			</Avatar>
			{isHeadingVisible && (
				<Heading tag="h1" variant="h2" className="text-white">
					{name || ''}
				</Heading>
			)}
		</div>
	);
}
