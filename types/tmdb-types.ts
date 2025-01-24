export type TResTMDB<TData> = {
	page: number;
	results: TData;
	total_pages: number;
	total_results: number;
};

export type TMovieTMDB = {
	backdrop_path: string;
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	adult: boolean;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	release_date: string; // ISO 8601 date format (e.g., "2024-12-25")
	video: boolean;
	vote_average: number;
	vote_count: number;
};
