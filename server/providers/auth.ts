import {
	accountsTable,
	sessionsTable,
	usersTable,
	verificationTokensTable,
} from '@/server/db/schemas';
import { db } from '@/server/providers/db';
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
	],
});
