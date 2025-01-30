import { TUserInsert, usersTable } from '@/server/db/schemas/user-schema';
import {
	integer,
	pgTable,
	smallint,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

import { TMediaTypes } from '@/types/types';

export const commentsTable = pgTable('comments', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('userId')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	mediaId: integer('mediaId').notNull(),
	mediaType: text('mediaType').$type<TMediaTypes>().notNull(),
	content: text('content'),
	rating: smallint('rating').notNull(),
	dateCreated: timestamp('dateCreated', {
		mode: 'date',
	}).defaultNow(),
});

export const commentsRelations = relations(commentsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [commentsTable.userId],
		references: [usersTable.id],
	}),
}));

// typ danych pobranych z bazy
export type TComment = typeof commentsTable.$inferSelect;
// typ danych wgrywanych do bazy
export type TCommentInsert = typeof commentsTable.$inferInsert;

export type TCommentWithUser = TComment & {
	user: TUserInsert;
};
