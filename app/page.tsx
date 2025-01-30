import { Suspense } from 'react';
import TMCBService from '@/server/services/tmdb-service';
import TmdbService from '@/server/services/tmdb-service';

import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import InfoBox from '@/components/info-box';
import MediaGrid from '@/components/media-grid/media-grid';
import MediaGridSkeleton from '@/components/media-grid/media-grid-skeleton';
import MovieCarousel from '@/components/movie-carousel/movie-carousel';
import Search from '@/components/search/search';

export default async function HomePage() {
	const [
		trendingMovies,
		topRatedMovies,
		topRatedTv,
		movieGenres,
		tvGenres,
		countries,
	] = await Promise.all([
		TMCBService.getTrendingMovies(),
		TMCBService.getTopRatedMovies(),
		TMCBService.getTopRatedTV(),
		TmdbService.getMovieGenres(),
		TmdbService.getTvGenres(),
		TmdbService.getCountries(),
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
				<Heading tag="h2">Search for movies and TV series:</Heading>
				{movieGenres && tvGenres && countries ? (
					<Search
						countries={countries}
						movieGenres={movieGenres}
						tvGenres={tvGenres}
					/>
				) : (
					''
				)}
			</Section>
			<Section>
				<Heading tag="h2">Movies and TV series:</Heading>
				<Suspense fallback={<MediaGridSkeleton />}>
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
				</Suspense>
			</Section>
			<Section>
				<Heading className="mb-12 text-center" tag="h2" variant="h1">
					Pay as you go
				</Heading>
				<InfoBox />
			</Section>
		</article>
	);
}
