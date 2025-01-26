type TProps = {
	rating: number;
	ratingCount: number;
};

export default function UserRating({ rating, ratingCount }: TProps) {
	return (
		<div className="my-5 flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-full bg-primary font-bold">
				{isNaN(rating) ? '-' : rating.toFixed(1)}
			</div>
			<div className="text-silver">{ratingCount} rates</div>
		</div>
	);
}
