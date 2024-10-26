import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: varchar().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerified: boolean().notNull(),
	image: varchar(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().notNull(),

	subscriptions: varchar().array().notNull(),
});

export const sessions = pgTable("sessions", {
	id: varchar().primaryKey().notNull(),
	userId: varchar().references(() => users.id),
	expiresAt: timestamp().notNull(),
	ipAddress: varchar(),
	userAgent: varchar(),
});

export const accounts = pgTable("accounts", {
	id: varchar().primaryKey().notNull(),
	userId: varchar().references(() => users.id),
	accountId: varchar().notNull(),
	providerId: varchar().notNull(),
	accessToken: varchar(),
	refreshToken: varchar(),
	expiresAt: timestamp(),
	password: varchar(),
});

export const verifications = pgTable("verifications", {
	id: varchar().primaryKey().notNull(),
	identifier: varchar().notNull(),
	value: varchar().notNull(),
	expiresAt: timestamp().notNull(),
});
