import { Metadata } from 'next';
import { redirect } from 'next/navigation';

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

	if (slug !== undefined && slug.length > 1) {
		redirect('/');
	}

	return (
		<article>
			<section>{slug?.toString()}</section>
		</article>
	);
}
