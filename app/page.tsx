import TMCBService from '@/server/services/tmdb-service';

import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import MediaGrid from '@/components/media-grid/media-grid';
import MovieCarousel from '@/components/movie-carousel/movie-carousel';

export default async function HomePage() {
	const [trendingMovies, topRatedMovies, topRatedTv] = await Promise.all([
		TMCBService.getTrendingMovies(),
		TMCBService.getTopRatedMovies(),
		TMCBService.getTopRatedTV(),
	]);
	return (
		<article>
			<section>
				{trendingMovies ? (
					<MovieCarousel movies={trendingMovies} />
				) : (
					''
				)}
			</section>
			<Section>
				<Heading tag="h2">Movies and TV series:</Heading>
				<div>
					{topRatedMovies ? (
						<MediaGrid
							mediaList={topRatedMovies}
							mediaType="movie"
						/>
					) : (
						''
					)}
				</div>
				<div className="pt-5">
					{topRatedTv ? (
						<MediaGrid mediaList={topRatedTv} mediaType="tv" />
					) : (
						''
					)}
				</div>
			</Section>
		</article>
	);
}
