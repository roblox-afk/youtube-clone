import { sql } from "drizzle-orm";
import {
	boolean,
	pgTable,
	text,
	timestamp,
	varchar,
	integer,
	pgEnum,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: varchar().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	emailVerified: boolean().notNull(),
	image: varchar().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().notNull(),

	subscriptions: varchar().array().notNull(),
	slash: varchar({ length: 50 }).notNull().unique(),
	description: text(),
	bannerImage: varchar(),
	videos: text().array().notNull(),
	posts: text().array().notNull(),
	subscribers: varchar().array().notNull().default([]),
	likedVideos: varchar().array().notNull().default([]),
	disLikedVideos: varchar().array().notNull().default([]),
});

export type User = typeof users.$inferSelect;

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

export enum VideoStatus {
	PRIVATE = "private",
	PUBLIC = "public",
	DRAFT = "draft",
}
export enum VideoRestrictions {
	KIDS = "made for kids",
	NONE = "none",
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumToPgEnum<T extends Record<string, any>>(
	myEnum: T
): [T[keyof T], ...T[keyof T][]] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return Object.values(myEnum).map((value: any) => `${value}`) as any;
}

export const visibilityEnum = pgEnum("visibility", enumToPgEnum(VideoStatus));
export const restrictionsEnum = pgEnum(
	"restrictions",
	enumToPgEnum(VideoRestrictions)
);

export const videos = pgTable("videos", {
	id: text().primaryKey().notNull(),
	channelId: text().notNull(),
	thumbnailUrl: varchar().default("").notNull(),
	sourceUrl: varchar().notNull(),
	title: text().notNull(),
	description: text().default("").notNull(),
	visibility: visibilityEnum(),
	comments: text()
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	likes: integer().default(0).notNull(),
	disLikes: integer().default(0).notNull(),
	views: integer().default(0).notNull(),
	restrictions: restrictionsEnum(),
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
	creator: varchar().references(() => users.id),
	content: text().notNull(),
	likes: integer().default(0),
	disLikes: integer().default(0),
	comments: text()
		.array()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	createdAt: timestamp().defaultNow().notNull(),
});
