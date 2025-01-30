'use client';

import CommentsCreate from '@/components/comments/comments-create';

type TProps = {
	comments: any;
};
export default function Comments({ comments }: TProps) {
	return (
		<div>
			<CommentsCreate addComment={() => ''} />
		</div>
	);
}
