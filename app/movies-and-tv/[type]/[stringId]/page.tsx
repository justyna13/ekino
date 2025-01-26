import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import TmdbService from '@/server/services/tmdb-service';
import { linkToType, typeToLabel } from '@/utils/translations';

import { TMDBImageOriginalUrl } from '@/config/tmdb-config';
import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import MediaBg from '@/components/media-bg';

type TProps = {
	params: Promise<{
		type: string;
		stringId: string;
	}>;
};

export async function generateMetadata(
	{ params }: TProps,
	// parent: ResolvingMetadata,
): Promise<Metadata> {
	const { stringId, type } = await params;
	return {
		title: `${type.toUpperCase()} ID: ${stringId}`,
	};
}

export default async function MovieDetailsPage({ params }: TProps) {
	const { type, stringId } = await params;

	if (type !== 'movies' && type !== 'series') {
		redirect('/search');
	}

	const mediaType = linkToType(type);
	const labelText = typeToLabel(type);
	const id = parseInt(stringId);

	const [media, mediaImages] = await Promise.all([
		mediaType === 'movie'
			? TmdbService.getMovieDetails(id)
			: TmdbService.getTVDetails(id),
		mediaType === 'movie'
			? TmdbService.getMovieImages(id)
			: TmdbService.getTVImages(id),
	]);

	if (!media) notFound();

	return (
		<article>
			<section>
				<MediaBg
					src={TMDBImageOriginalUrl + media.backdrop_path}
					title={'title' in media ? media.title : media.name}
					originalTitle={
						'original_title' in media
							? media.original_title
							: media.original_name
					}
					created={
						'release_date' in media
							? media.release_date
							: media.first_air_date
					}
					rating={media.vote_average}
					ratingCount={media.vote_count}
					type={mediaType}
					actorsList={media.credits.cast.slice(0, 4)}
					actorsListCount={media.credits.cast.length}
				/>
			</section>
			<Section>
				<Heading tag="h2" variant="h3">
					Description of a {labelText.toLowerCase()}{' '}
					{'title' in media ? media.title : media.name}
				</Heading>
				<div className="text-white">{media.overview}</div>
			</Section>
		</article>
	);
}
