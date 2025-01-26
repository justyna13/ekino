import { api } from '@/server/helpers/api-helpers';

import {
	TMovieTMDB,
	TMovieTMDBDetailsWithCredits,
	TResTMDB,
	TTMDBImages,
	TTMDBTVShowDetailsWithCredits,
	TTVShowTMDB,
} from '@/types/tmdb-types';
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
	//https://api.themoviedb.org/3/movie/{movie_id}
	async getMovieDetails(id: number) {
		return await api<
			TMovieTMDBDetailsWithCredits,
			{ language: string; append_to_response: string }
		>(`${TMDBAPIUrl}/movie/${id}`, {
			params: {
				language: 'pl',
				append_to_response: 'credits',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});
	},
	// https://api.themoviedb.org/3/movie/{movie_id}/images
	async getMovieImages(id: number) {
		return await api<TTMDBImages, null>(
			`${TMDBAPIUrl}/movie/${id}/images`,
			{
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600 * 24 * 7,
					},
				},
			},
		);
	},
	// https://api.themoviedb.org/3/tv/{series_id}
	async getTVDetails(id: number) {
		return await api<
			TTMDBTVShowDetailsWithCredits,
			{ language: string; append_to_response: string }
		>(`${TMDBAPIUrl}/tv/${id}`, {
			params: {
				language: 'pl',
				append_to_response: 'credits',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});
	},
	// https://api.themoviedb.org/3/tv/{series_id}/images
	async getTVImages(id: number) {
		return await api<TTMDBImages, null>(`${TMDBAPIUrl}/tv/${id}/images`, {
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600 * 24 * 7,
				},
			},
		});
	},
};

export default TMCBService;
