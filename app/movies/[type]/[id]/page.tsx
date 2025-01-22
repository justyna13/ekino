type TProps = {
	params: {
		type: string;
		id: string;
	};
};

export default function MovieDetailsPage({ params: { type, id } }: TProps) {
	return (
		<div>
			details of {type} #{id}
		</div>
	);
}
