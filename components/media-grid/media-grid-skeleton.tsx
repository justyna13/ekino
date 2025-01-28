import { Skeleton } from '@/components/ui/skeleton';

export default function MediaGridSkeleton() {
	return (
		<div className="grid gap-5 xl:grid-cols-3">
			<Skeleton className="h-[520px]" />
			<Skeleton className="h-[520px]" />
			<Skeleton className="h-[520px]" />

			<Skeleton className="h-[520px]" />
			<Skeleton className="h-[520px]" />
			<Skeleton className="h-[520px]" />
		</div>
	);
}
