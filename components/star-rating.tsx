'use client';

import { cn } from '@/utils/lib/tailwind';

import { ratingTexts } from '@/config/misc-config';
import { Icons } from '@/components/icons/icons';

type TProps = {
	rating: number;
	setRating?: (rating: number) => void;
	hints?: boolean;
	className?: string;
};

export default function StarRating({
	rating,
	setRating,
	hints = false,
	className,
}: TProps) {
	const handleRating = (starRating: number) => {
		if (!setRating) return false;

		if (starRating > 0 && starRating <= 10) {
			setRating(starRating);
		}
	};

	const stars = [];

	for (let i = 1; i <= 10; i++) {
		stars.push(
			<Icons.star
				key={i}
				data-rating={i}
				onClick={() => handleRating(i)}
				className={cn(
					'size-7 cursor-pointer stroke-primary pl-1 pr-1 hover:fill-primary xl:size-10 [&:has(_~_*:hover)]:fill-primary',
					rating > i - 1 ? 'fill-primary' : '',
					!setRating ? 'pointer-events-none' : '',
				)}
			/>,
		);
	}
	return (
		<>
			<div className={cn('relative flex', className)}>{stars}</div>
			{hints && (
				<div className="my-2 text-lg text-white">
					{ratingTexts[rating]}
				</div>
			)}
		</>
	);
}
