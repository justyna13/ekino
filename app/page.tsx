import TMCBService from '@/server/services/tmdb-service';

import MovieCarousel from '@/components/movie-carousel/movie-carousel';

export default async function HomePage() {
	const trendingMovies = await TMCBService.getTrendingMovies();

	return (
		<article>
			<section>
				{trendingMovies ? (
					<MovieCarousel movies={trendingMovies} />
				) : (
					''
				)}
			</section>
		</article>
	);
}
