import Image from 'next/image';

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';

type TProps = {
	name: string;
	character: string;
	src?: string;
};

export default function ActorAvatarItem({ name, character, src }: TProps) {
	return (
		<HoverCard openDelay={350}>
			<HoverCardTrigger>
				{src ? (
					<Image
						src={src}
						alt={name}
						className="aspect-square size-[60px] rounded-full object-cover"
						width={60}
						height={60}
					/>
				) : (
					<div className="size=[60px] aspect-square rounded-full bg-primary" />
				)}
			</HoverCardTrigger>
			<HoverCardContent className="tooltip-bottom relative mt-5 w-full rounded-none border-primary bg-foreground p-4 text-center">
				<div className="text-white">{name}</div>
				<div className="text-silver">{character}</div>
			</HoverCardContent>
		</HoverCard>
	);
}
