import {
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	creationData: timestamp(),
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	username: varchar({ length: 255 }).notNull(),
	profileImg_url: text(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar().notNull(),
});
