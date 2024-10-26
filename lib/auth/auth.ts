import { betterAuth } from "better-auth";
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
			channelId: {
				type: "string",
				required: false,
				defaultValue: null,
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
});
