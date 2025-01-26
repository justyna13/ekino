import { api } from '@/server/helpers/api-helpers';

import { TMovieTMDB, TResTMDB } from '@/types/tmdb-types';
import { TMDBAPIUrl, TMDBHeaders } from '@/config/tmdb-config';

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
