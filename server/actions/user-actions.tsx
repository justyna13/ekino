'use server';

import { revalidatePath } from 'next/cache';
import UserRepository from '@/server/db/repositories/user-repository';
import {
	EkinoError,
	getError,
	SessionError,
} from '@/server/helpers/error-helpers';
import { auth } from '@/server/providers/auth';
import {
	TRegistrationValidationErrors,
	userSignUpValidator,
} from '@/validators/user-validator';
import bcrypt from 'bcryptjs';

export async function registerUser(formData: FormData) {
	try {
		const { email, name, password } = userSignUpValidator.parse(
			Object.fromEntries(formData),
		);

		const userExist = await UserRepository.isExist(email, name);

		if (userExist) {
			throw new EkinoError('User already exists');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await UserRepository.insert(email, name, hashedPassword);

		return {
			success: true as const,
			message: 'Registered successfully.',
		};
	} catch (error) {
		return getError(error);
	}
}

export async function getProfile() {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			throw new SessionError();
		}

		const user = await UserRepository.firstById(session.user.id);

		if (!user) {
			throw new EkinoError('No user in the database.');
		}

		return {
			success: true as const,
			data: user,
		};
	} catch (error) {
		return getError(error);
	}
}

export async function updateProfile(formData: FormData) {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			throw new SessionError();
		}

		const { email, name, password } = userSignUpValidator.parse(
			Object.fromEntries(formData),
		);

		if (session.user.email !== email) {
			const user = await UserRepository.firstByEmail(email);

			if (user) {
				throw new EkinoError('User already exists');
			}
		}

		if (session.user.name !== name) {
			const user = await UserRepository.firstByName(name);

			if (user) {
				throw new EkinoError('Username already exists');
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await UserRepository.update(session.user.id, {
			name,
			email,
			password: hashedPassword,
		});

		revalidatePath('/my-account');

		return {
			success: true as const,
			message: 'Update successfully.',
			data: {
				name,
				email,
			},
		};
	} catch (error) {
		return getError<TRegistrationValidationErrors>(error);
	}
}
