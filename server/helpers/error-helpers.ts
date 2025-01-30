import { redirect } from 'next/navigation';
import { TRegistrationValidationErrors } from '@/validators/user-validator';
import { ZodError } from 'zod';

export class EkinoError extends Error {}
export class SessionError extends Error {}

export function getError<ParsedErrorType>(error: unknown) {
	if (error instanceof EkinoError) {
		return {
			success: false as const,
			message: error.message,
		};
	} else if (error instanceof ZodError) {
		return {
			success: false as const,
			message: 'Errors in a form, please correct them and try again.',
			errors: error.flatten().fieldErrors as ParsedErrorType,
		};
	} else if (error instanceof SessionError) {
		return {
			success: false as const,
			message: 'Access for logged in users only',
		};
	} else if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
		redirect('/');
	}

	return {
		success: false as const,
		message: 'Sorry an error occurred.',
	};
}
