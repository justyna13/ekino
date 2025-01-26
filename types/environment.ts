declare global {
	/* eslint-disable @typescript-eslint/no-namespace */
	namespace NodeJS {
		interface ProcessEnv {
			MOVIE_DB_TOKEN: string;
		}
	}
}

export {};
