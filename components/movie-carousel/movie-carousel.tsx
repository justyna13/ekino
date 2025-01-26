'use client';

import { TMovieTMDB } from '@/types/tmdb-types';
import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import MovieCarouselDots from '@/components/movie-carousel/movie-carousel-dots';
import MovieCarouselItem from '@/components/movie-carousel/movie-carousel-item';

type TProps = {
	movies: TMovieTMDB[];
};

export default function MovieCarousel({ movies }: TProps) {
	return (
		<Carousel
			opts={{
				loop: true,
				duration: 45,
			}}
		>
			<CarouselContent>
				{movies.map((movie, idx) => (
					<MovieCarouselItem
						key={movie.id}
						movie={movie}
						hasPriority={idx === 0}
					/>
				))}
			</CarouselContent>
			<CarouselPrevious className="bottom-1/3 left-4 top-auto hidden size-12 border-none bg-primary lg:flex 2xl:left-24 2xl:top-1/2" />
			<CarouselNext className="bottom-1/3 right-4 top-auto hidden size-12 border-none bg-primary lg:flex 2xl:right-24 2xl:top-1/2" />
			<div className="hidden lg:block">
				<MovieCarouselDots />
			</div>
		</Carousel>
	);
}
