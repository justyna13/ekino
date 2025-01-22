import { Metadata } from 'next';

type TProps = {
	params: Promise<{
		type: string;
		id: string;
	}>;
};

export async function generateMetadata(
	{ params }: TProps,
	// parent: ResolvingMetadata,
): Promise<Metadata> {
	const { id, type } = await params;
	return {
		title: `${type.toUpperCase()} ID: ${id}`,
	};
}

export default async function MovieDetailsPage({ params }: TProps) {
	const { type, id } = await params;
	return (
		<div>
			details of {type} #{id}
		</div>
	);
}
