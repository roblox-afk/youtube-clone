import { betterAuth } from "better-auth";
import { multiSession } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
	user: {
		additionalFields: {
			subscriptions: {
				type: "string[]",
				required: false,
				defaultValue: [],
				input: false,
			},
			videos: {
				type: "string[]",
				required: false,
				defaultValue: [],
				input: false,
			},
			posts: {
				type: "string[]",
				required: false,
				defaultValue: [],
				input: false,
			},
			slash: {
				type: "string",
				required: false,
				defaultValue: null,
			},
			description: {
				type: "string",
				required: false,
				defaultValue: null,
				input: false,
			},
			bannerImage: {
				type: "string",
				required: false,
				defaultValue: null,
				input: false,
			},
			subscribers: {
				type: "number",
				required: false,
				defaultValue: 0,
				input: false,
			},
		},
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...schema,
		},
		usePlural: true,
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	plugins: [multiSession()],
});
