import TMCBService from '@/server/services/tmdb-service';

export default async function HomePage() {
	const trendingMovies = await TMCBService.getTrendingMovies();

	console.log(trendingMovies);
	return <div className="bg-white"></div>;
}
