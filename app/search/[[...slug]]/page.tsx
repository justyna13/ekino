import { Metadata } from 'next';

type TProps = {
	params: Promise<{
		slug?: string[];
	}>;
};

export async function generateMetadata(
	{ params }: TProps,
	// parent: ResolvingMetadata,
): Promise<Metadata> {
	const { slug } = await params;
	return {
		title: !slug ? 'Szukaj' : `Szukaj ${slug}`,
	};
}

export default async function SearchPage({ params }: TProps) {
	const { slug } = await params;
	return (
		<article>
			<section>{slug?.toString()}</section>
		</article>
	);
}
