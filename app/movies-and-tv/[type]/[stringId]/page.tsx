import { Metadata } from 'next';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { getComments } from '@/server/actions';
import TmdbService from '@/server/services/tmdb-service';
import { linkToType, typeToLabel } from '@/utils/translations';

import { TMDBImageOriginalUrl } from '@/config/tmdb-config';
import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import Comments from '@/components/comments/comments';
import Gallery from '@/components/gallery/gallery';
import MediaBg from '@/components/media-bg';
import UserRating from '@/components/user-rating';

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

export async function generateStaticParams() {
	const [topRatedMovies, topRatedTV] = await Promise.all([
		TmdbService.getTopRatedMovies(),
		TmdbService.getTopRatedTV(),
	]);

	if (!topRatedMovies || !topRatedTV) return [];

	const moviesParams = topRatedMovies.map(({ id }) => ({
		type: 'movies',
		stringId: String(id),
	}));

	const tvParams = topRatedTV.map(({ id }) => ({
		type: 'series',
		stringId: String(id),
	}));

	return [...moviesParams, ...tvParams];
}

export default async function MovieDetailsPage({ params }: TProps) {
	const { type, stringId } = await params;

	if (type !== 'movies' && type !== 'series') {
		redirect('/search');
	}

	const mediaType = linkToType(type);
	const labelText = typeToLabel(mediaType);
	const id = parseInt(stringId);

	const [media, mediaImages, comments] = await Promise.all([
		mediaType === 'movie'
			? TmdbService.getMovieDetails(id)
			: TmdbService.getTVDetails(id),
		mediaType === 'movie'
			? TmdbService.getMovieImages(id)
			: TmdbService.getTVImages(id),
		getComments(id, mediaType),
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
			{mediaImages?.backdrops ? (
				<Section>
					<Gallery images={mediaImages.backdrops} />
				</Section>
			) : (
				''
			)}
			<Section className="mx-auto max-w-[900px]">
				<Heading tag="h2" variant="h3" className="mb-4">
					Watcher&#39;s rating:
				</Heading>
				<div className="grid gap-3 sm:grid-cols-2 sm:gap-10">
					<Image
						src={'/testimonial-ok.svg'}
						alt={'testimonials-ok'}
						width={500}
						height={500}
						className="mx-auto"
					/>
					<UserRating
						variant="large"
						ratingCount={
							comments.success ? comments.data.length : 0
						}
						rating={
							comments.success
								? comments.data.reduce(
										(acc, curr) => acc + curr.rating,
										0,
									) / comments.data.length
								: 0
						}
					/>
				</div>
				<Comments
					comments={comments.success ? comments.data : undefined}
				/>
			</Section>
		</article>
	);
}
