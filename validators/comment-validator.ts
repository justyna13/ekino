import { inferFlattenedErrors, literal, number, object, string, z } from 'zod';

export const commentValidator = object({
	content: string()
		.trim()
		.min(3, {
			message: 'Min 3 characters.',
		})
		.max(512, {
			message: 'Maximum 512 characters.',
		})
		.optional()
		.or(literal('')),
	rating: number()
		.min(1, {
			message: 'Rating must be at least 1',
		})
		.max(10, {
			message: 'Maximum scale is 10',
		}),
	mediaId: number(),
	mediaType: z.enum(['movie', 'tv']),
	userId: string(),
});

export type TCommentValidatorErrors = inferFlattenedErrors<
	typeof commentValidator
>['fieldErrors'];

export type TCommentValidator = z.infer<typeof commentValidator>;
