import {
	accountsTable,
	sessionsTable,
	usersTable,
	verificationTokensTable,
} from '@/server/db/schemas';
import { db } from '@/server/providers/db';
import Credentials from '@auth/core/providers/credentials';
import Google from '@auth/core/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db, {
		accountsTable,
		sessionsTable,
		usersTable,
		verificationTokensTable,
	}),
	providers: [
		Google({
			allowDangerousEmailAccountLinking: true,
		}),
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async ({ password, email }) => {
				try {
					if (
						typeof email !== 'string' ||
						typeof password !== 'string'
					) {
						throw new Error('Invalid credentials');
					}

					const user = await db.query.usersTable.findFirst({
						where: eq(usersTable.email, email),
					});

					if (!user || !user.password) {
						throw new Error('User not found');
					}

					const passwordMatch = await bcrypt.compare(
						password,
						user.password,
					);

					if (!passwordMatch) {
						throw new Error('Invalid credentials');
					}

					return user;
				} catch (e) {
					console.log(e);
					return null;
				}
			},
		}),
	],
	events: {
		signIn(msg) {
			console.log(msg);
		},
	},
	callbacks: {},
	pages: {
		signIn: '/login',
		signOut: '/login',
		error: '/login',
	},
	session: {
		strategy: 'jwt',
	},
});
