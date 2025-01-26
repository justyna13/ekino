import Image from 'next/image';
import { typeToLabel } from '@/utils/translations';

import { TTMDBCast } from '@/types/tmdb-types';
import { TMediaTypes } from '@/types/types';
import { Badge } from '@/components/ui/badge';
import ButtonGoDown from '@/components/ui/button-go-down';
import Heading from '@/components/ui/heading';
import ActorAvatars from '@/components/actor-avatars/actor-avatars';
import UserRating from '@/components/user-rating';

type TProps = {
	src: string;
	title: string;
	type: TMediaTypes;
	originalTitle?: string;
	created?: string;
	rating?: number;
	ratingCount?: number;
	actorsList?: TTMDBCast[];
	actorsListCount?: number;
};

export default function MediaBg({
	src,
	title,
	type,
	originalTitle,
	created,
	rating,
	ratingCount,
	actorsList,
	actorsListCount,
}: TProps) {
	const typeLabel = typeToLabel(type);

	return (
		<div className="lg:h[calc(100vh_-_77px)] relative h-[50vh] w-full pl-0 lg:h-[80vh]">
			<Image
				src={src}
				fill
				className="object-cover object-top"
				priority
				alt=""
			/>
			<div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-foreground to-transparent" />
			<div className="absolute top-1/4 w-full sm:top-1/3 lg:top-1/4">
				<div className="container">
					<Badge className="mb-3 text-foreground">{typeLabel}</Badge>
					<Heading tag="h2" className="text-white lg:max-w-[67%]">
						{title}
					</Heading>
					<div className="mt-3 max-w-[450px]">
						<div className="flex flex-col gap-3 text-silver lg:flex-row">
							<span>{originalTitle}</span>
							<span>{created}</span>
						</div>
						{rating && ratingCount && (
							<UserRating
								rating={rating}
								ratingCount={ratingCount}
							/>
						)}
					</div>
					{actorsList && actorsListCount ? (
						<ActorAvatars
							actorsList={actorsList}
							actorsListCount={actorsListCount}
						/>
					) : (
						''
					)}
					<div className="mt-20 hidden text-center xl:block">
						<ButtonGoDown>Read more</ButtonGoDown>
					</div>
				</div>
			</div>
		</div>
	);
}
