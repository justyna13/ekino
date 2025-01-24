import { api } from '@/server/helpers/api-helpers';

import { TMovieTMDB, TResTMDB } from '@/types/tmdb-types';

const TMDBAPIUrl = 'https://api.themoviedb.org/3';
const TMDBHeaders = {
	Authorization: `Bearer ${process.env.MOVIE_DB_TOKEN}`,
	Accept: 'application/json',
};

const TMCBService = {
	// https://developer.themoviedb.org/reference/trending-movies
	async getTrendingMovies() {
		const data = await api<TResTMDB<TMovieTMDB[]>, { language: string }>(
			`${TMDBAPIUrl}/trending/movie/week`,
			{
				params: {
					language: 'pl',
				},
				headers: TMDBHeaders,
			},
		);

		return data?.results.splice(0, 3);
	},
};

export default TMCBService;
