import { TMediaTypes } from '@/types/types';

export const typeToLabel = (mediaType: TMediaTypes) =>
	mediaType === 'movie' ? 'Film' : 'Serial';
export const typeToLink = (mediaType: TMediaTypes) =>
	mediaType === 'movie' ? 'filmy' : 'seriale';
