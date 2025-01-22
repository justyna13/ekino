import Image from 'next/image';
import BannerKino2 from '@/public/baner_ekino_2.jpg';
import BannerKino from '@/public/baner_ekino.jpg';

export default function ImagesTestPage() {
	return (
		<>
			<div className="grid xl:grid-cols-3">
				<Image
					src={BannerKino}
					alt=""
					sizes="(min-width: 1200px) 33vw, 100vw"
					placeholder="blur"
				/>
				<Image
					src={BannerKino2}
					alt=""
					sizes="(min-width: 1200px) 33vw, 100vw"
					placeholder="blur"
				/>
				<Image
					src={BannerKino}
					alt=""
					sizes="(min-width: 1200px) 33vw, 100vw"
					placeholder="blur"
				/>
			</div>
		</>
	);
}
