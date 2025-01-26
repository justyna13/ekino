import Image from 'next/image';
import Link from 'next/link';

import { TMovieTMDB } from '@/types/tmdb-types';
import { TMDBImageOriginalUrl } from '@/config/tmdb-config';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CarouselItem } from '@/components/ui/carousel';
import Heading from '@/components/ui/heading';
import UserRating from '@/components/user-rating';

type TProps = {
	movie: TMovieTMDB;
	hasPriority: boolean;
};

export default function MovieCarouselItem({
	movie: {
		id,
		backdrop_path,
		title,
		original_title,
		release_date,
		vote_average,
		vote_count,
	},
	hasPriority = false,
}: TProps) {
	return (
		<CarouselItem className="lg:h[calc(100vh_-_77px)] relative h-[50vh] w-full pl-0 lg:h-[80vh]">
			<Image
				src={`${TMDBImageOriginalUrl}${backdrop_path}`}
				fill
				className="object-cover object-top"
				fill-priority={hasPriority}
				alt=""
			/>
			<div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-foreground to-transparent" />
			<div className="absolute top-1/4 w-full sm:top-1/3 lg:top-1/4">
				<div className="container">
					<Badge className="mb-3 text-foreground">Film</Badge>
					<Heading tag="h2">{title}</Heading>
					<div className="mt-3 max-w-[450px]">
						<div className="hidden flex-row gap-3 text-silver lg:flex">
							<span>{original_title}</span>
							<span>{release_date}</span>
						</div>
						<UserRating
							rating={vote_average}
							ratingCount={vote_count}
						/>
					</div>
					<div className="mr-3 text-center lg:mt-20">
						<Link href={`movies-and-tv/movies/${id}`}>
							<Button
								variant={'outline'}
								className="bg-transparent text-white"
							>
								Find out more
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</CarouselItem>
	);
}
