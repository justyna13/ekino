'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import { Textarea } from '@/components/ui/textarea';
import FormField from '@/components/form-field';
import StarRating from '@/components/star-rating';

type TProps = {
	addComment: () => void;
};
export default function CommentsCreate({ addComment }: TProps) {
	const [content, setContent] = useState('');
	const [rating, setRating] = useState(0);
	return (
		<div className="space-y-2">
			<FormField label="Your comment">
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
				<Button className="relative">Add a comment</Button>
				<div className="w-full">
					<FormError />
				</div>
			</div>
		</div>
	);
}
