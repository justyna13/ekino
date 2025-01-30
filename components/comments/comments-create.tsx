'use client';

import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { sendComment } from '@/server/actions';
import { TCommentWithUser } from '@/server/db/schemas';
import { useToast } from '@/utils/hooks/use-toast';
import { linkToType } from '@/utils/translations';
import { TCommentValidatorErrors } from '@/validators/comment-validator';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import Loader from '@/components/ui/loader';
import { Textarea } from '@/components/ui/textarea';
import FormField from '@/components/form-field';
import StarRating from '@/components/star-rating';

type TProps = {
	addCommentAction: (comment: TCommentWithUser) => void;
};
export default function CommentsCreate({ addCommentAction }: TProps) {
	const [content, setContent] = useState('');
	const [rating, setRating] = useState(0);
	const [formErrors, setFormErrors] = useState<TCommentValidatorErrors>({});
	const { toast } = useToast();
	const { data: session } = useSession();
	const { type, stringId } = useParams<{
		type: 'movies' | 'series';
		stringId: string;
	}>();
	const [isPending, startTransition] = useTransition();

	const mediaType = linkToType(type);

	if (!session) {
		return <div className="text-white">Login to add a comment</div>;
	}

	const handleSend = async () => {
		if (isPending) return false;

		const comment = {
			mediaId: parseInt(stringId),
			mediaType,
			content,
			rating,
		};

		setContent('');
		setRating(0);

		startTransition(async () => {
			addCommentAction({
				...comment,
				dateCreated: new Date(),
				id: crypto.randomUUID(),
				userId: '',
				user: {
					id: session?.user?.id || '',
					name: session?.user?.name || '',
					image: session?.user?.image || '',
					email: session?.user?.email || '',
				},
			});

			const res = await sendComment(comment);

			if (!res.success && res.errors) {
				setFormErrors(res.errors);
			} else {
				setFormErrors({});
			}

			toast({
				title: res.message,
				variant: res.success ? 'success' : 'destructive',
			});
		});
	};

	return (
		<div className="space-y-2">
			<FormField label="Your comment" errors={formErrors.content}>
				<Textarea
					placeholder="Enter your comment"
					name="content"
					id="content"
					value={content}
					onChange={e => setContent(e.target.value)}
				></Textarea>
			</FormField>
			<p className="text-white">Rate the movie form 1 to 10</p>
			<div className="flex-wrap items-center justify-between md:flex">
				<StarRating
					rating={rating}
					setRating={rating => setRating(rating)}
					hints
				/>
				<Button className="relative" onClick={handleSend}>
					Add a comment
					{isPending ? (
						<Loader className="absolute right-2.5 top-2.5" />
					) : (
						''
					)}
				</Button>
				<div className="w-full">
					<FormError errors={formErrors.rating} />
				</div>
			</div>
		</div>
	);
}
