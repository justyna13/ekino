import { TTMDBImages } from '@/types/tmdb-types';
import Heading from '@/components/ui/heading';
import GalleryItem from '@/components/gallery/gallery-item';

type TProps = {
	images: TTMDBImages['backdrops'];
};

export default function Gallery({ images }: TProps) {
	if (images.length < 2) {
		return (
			<Heading tag="h4" variant="h4" className="text-white">
				No image gallery...
			</Heading>
		);
	}

	return (
		<div className="grid-rows-[repeat(6, 100px)] grid gap-1 sm:grid-cols-4 sm:grid-rows-[270px_100px_270px] [&>div:hover_img]:scale-110 [&>div:hover_img]:opacity-70">
			<GalleryItem
				imgSize="big"
				className="col-span-2 row-span-2"
				src={images[1]?.file_path}
			/>
			<GalleryItem imgSize="small" src={images[2]?.file_path} />
			<GalleryItem imgSize="small" src={images[3]?.file_path} />
			<GalleryItem
				imgSize="small"
				className="row-start-3"
				src={images[4]?.file_path}
			/>
			<GalleryItem
				imgSize="small"
				className="row-start-3"
				src={images[5]?.file_path}
			/>
			<GalleryItem
				imgSize="big"
				className="col-span-2 row-span-2"
				src={images[6]?.file_path}
			/>
		</div>
	);
}
