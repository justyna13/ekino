'use server';

import { revalidatePath } from 'next/cache';
import CommentRepository from '@/server/db/repositories/comment-repository';
import { TCommentInsert } from '@/server/db/schemas';
import {
	EkinoError,
	getError,
	SessionError,
} from '@/server/helpers/error-helpers';
import { auth } from '@/server/providers/auth';
import { typeToLink } from '@/utils/translations';
import { commentValidator } from '@/validators/comment-validator';

import { TMediaTypes } from '@/types/types';

export async function getComments(mediaId: number, mediaType: TMediaTypes) {
	try {
		const comments = await CommentRepository.many(mediaId, mediaType);

		return {
			success: true as const,
			data: comments,
		};
	} catch (error) {
		console.log(error);
		return getError(error);
	}
}

export async function sendComment(data: Omit<TCommentInsert, 'userId'>) {
	try {
		const session = await auth();

		if (!session.user.id) {
			throw new SessionError();
		}

		const comment = commentValidator.parse({
			...data,
			userId: session.user.id,
		});
		const isCommentExist = await CommentRepository.isExist(
			comment.mediaId,
			comment.mediaType,
			comment.userId,
		);

		if (isCommentExist) {
			throw new EkinoError('You already commented this move or tv');
		}

		await CommentRepository.insert(comment);

		const mediaLink = typeToLink(comment.mediaType);

		revalidatePath(`/movies-and-tv/${mediaLink}/${comment.mediaId}`);

		return {
			success: true as const,
			message: 'Comment added successfully.',
		};
	} catch (error) {
		console.log(error);
		return getError(error);
	}
}
