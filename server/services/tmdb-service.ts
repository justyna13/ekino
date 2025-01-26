import { api } from '@/server/helpers/api-helpers';

import { TMovieTMDB, TResTMDB, TTVShowTMDB } from '@/types/tmdb-types';
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
				options: {
					next: {
						revalidate: 3600,
					},
				},
			},
		);

		return data?.results.splice(0, 3);
	},

	// https://api.themoviedb.org/3/movie/top_rated
	async getTopRatedMovies() {
		const data = await api<
			TResTMDB<TMovieTMDB[]>,
			{ language: string; region: string }
		>(`${TMDBAPIUrl}/movie/top_rated`, {
			method: 'GET',
			params: {
				language: 'pl',
				region: 'PL',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data?.results.splice(0, 3);
	},

	// https://api.themoviedb.org/3/tv/top_rated
	async getTopRatedTV() {
		const data = await api<TResTMDB<TTVShowTMDB[]>, { language: string }>(
			`${TMDBAPIUrl}/tv/top_rated`,
			{
				method: 'GET',
				params: {
					language: 'pl',
				},
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600,
					},
				},
			},
		);

		return data?.results.splice(0, 3);
	},
};

export default TMCBService;
