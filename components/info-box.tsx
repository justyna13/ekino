import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function InfoBox() {
	return (
		<div className="grid lg:grid-cols-2">
			<div className="relative h-[300px] w-full lg:h-[460px]">
				<Image
					src="/movie_night.svg"
					fill
					alt="Someone watching movie and eating popcorn"
				/>
			</div>
			<div className="mx-auto space-y-5 border border-white px-5 py-12 text-center text-white lg:max-w-[360px]">
				<p className="text-lg">
					You can buy an access to any movie or TV series
				</p>
				<div>
					<Badge className="text-foreground">Movies</Badge> &nbsp; =
					&nbsp; 30.90 PLN * <br />
					<br />
					<Badge className="text-foreground">Series</Badge> &nbsp; =
					&nbsp; 60.25 PLN **
				</div>
				<div>
					<small>* Access for 72h of watching</small>
				</div>
				<div>
					<small>** Access for 7 days of watching</small>
				</div>
				<Link href={'/search'} className="block">
					<Button variant="outline" className="bg-transparent">
						Check out some movies and TV series
					</Button>
				</Link>
			</div>
		</div>
	);
}
