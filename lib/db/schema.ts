import { sql } from "drizzle-orm";
import {
	boolean,
	pgTable,
	text,
	timestamp,
	varchar,
	integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: varchar().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerified: boolean().notNull(),
	image: varchar(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().notNull(),

	subscriptions: varchar().array().notNull(),
	slash: varchar({ length: 50 }).notNull().unique(),
	description: text(),
	bannerImage: varchar(),
	videos: text().array().notNull(),
	posts: text().array().notNull(),
	subscribers: integer().default(0),
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

export const videos = pgTable("videos", {
	id: text().primaryKey().notNull(),
	thumbnailUrl: varchar().default("").notNull(),
	sourceUrl: varchar().notNull(),
	title: text().notNull(),
	description: text().default("").notNull(),
	isPublic: boolean().default(false).notNull(),
	isDraft: boolean().default(true).notNull(),
	comments: text()
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	likes: integer().default(0).notNull(),
	disLikes: integer().default(0).notNull(),
	views: integer().default(0).notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;

export const posts = pgTable("posts", {
	id: text().primaryKey(),
	content: text().notNull(),
	linkedVideo: varchar(),
	linkedImage: varchar(),
	comments: text()
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	likes: integer().default(0),
	disLikes: integer().default(0),
	createdAt: timestamp().defaultNow().notNull(),
});

export const comments = pgTable("comments", {
	id: text().primaryKey(),
	content: text().notNull(),
	likes: integer().default(0),
	disLikes: integer().default(0),
	comments: text()
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	createdAt: timestamp().defaultNow().notNull(),
});
