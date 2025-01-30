'use client';

import { useOptimistic } from 'react';
import { TCommentWithUser } from '@/server/db/schemas';

import CommentsCreate from '@/components/comments/comments-create';
import CommentsItem from '@/components/comments/comments-item';

type TProps = {
	comments?: TCommentWithUser[];
};
export default function Comments({ comments }: TProps) {
	const [optimisticComments, addOptimisticComment] = useOptimistic<
		TCommentWithUser[],
		TCommentWithUser
	>(comments || [], (state, newComment) => [newComment, ...state]);

	return (
		<div>
			<CommentsCreate
				addCommentAction={comment => addOptimisticComment(comment)}
			/>
			<div className="mt-12">
				{optimisticComments
					? optimisticComments.map(comment => (
							<CommentsItem key={comment.id} comment={comment} />
						))
					: ''}
			</div>
		</div>
	);
}
