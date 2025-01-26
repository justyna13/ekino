export const TMDBAPIUrl = 'https://api.themoviedb.org/3';
export const TMDBHeaders = {
	Authorization: `Bearer ${process.env.MOVIE_DB_TOKEN}`,
	Accept: 'application/json',
};

export const TMDBImageOriginalUrl = 'https://image.tmdb.org/t/p/original';
