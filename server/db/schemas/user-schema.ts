import { commentsTable } from '@/server/db/schemas/comment-schema';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

export const usersTable = pgTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').unique(),
	password: varchar('password', { length: 255 }),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	comments: many(commentsTable),
}));

export type TUser = typeof usersTable.$inferSelect;
export type TUserInsert = typeof usersTable.$inferInsert;
