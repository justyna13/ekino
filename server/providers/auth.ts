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
			authorize: async credentials => {
				try {
					throw new Error('test');
				} catch (e) {
					console.log(e);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
		signOut: '/login',
		error: '/login',
	},
});
