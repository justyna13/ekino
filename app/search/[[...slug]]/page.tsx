type TProps = {
	params: {
		slug?: string[];
	}
}

export default function SearchPage({params}: TProps) {
	return (
		<article>
			<section>{params && params.slug?.toString() }</section>
		</article>
	)
}
