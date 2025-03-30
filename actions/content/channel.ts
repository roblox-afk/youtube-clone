"use server";
import { db } from "@/lib/db";
import { User, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, unstable_cache } from "next/cache";

export const getChannel = unstable_cache(
	async (id: string) => {
		const data = await db.select().from(users).where(eq(users.id, id));
		if (data[0] == null) return null;
		return data[0];
	},
	["channel"],
	{ revalidate: 360, tags: ["channel"] }
);

export const getSubscribedChannels = unstable_cache(
	async (channels: string[]) => {
		let data: User[] = [];
		channels.forEach(async (id) => {
			const channelData = await getChannel(id);
			if (channelData == null) return;
			data = [...data, channelData];
		});
		if (data.length === 0) return null;
		return data;
	},
	["subscribedChannels"],
	{ revalidate: 360, tags: ["subscribedChannels"] }
);

export async function subscribeToChannel(channelId: string, userId: string) {
	const userData = await db.select().from(users).where(eq(users.id, userId));
	const channelData = await db
		.select()
		.from(users)
		.where(eq(users.id, channelId));
	const newUserSubscriptions = [...userData[0].subscriptions, channelId];
	const newChannelSubscribers = [...channelData[0].subscribers, channelId];

	if (channelData[0].subscribers.includes(userId)) {
		return;
	}

	await db
		.update(users)
		.set({
			subscriptions: newUserSubscriptions,
		})
		.where(eq(users.id, userId));
	await db
		.update(users)
		.set({
			subscribers: newChannelSubscribers,
		})
		.where(eq(users.id, channelId));
	revalidatePath("/watch");
}

export async function unsubscribeFromChannel(
	channelId: string,
	userId: string
) {
	const userData = await db.select().from(users).where(eq(users.id, userId));
	const channelData = await db
		.select()
		.from(users)
		.where(eq(users.id, channelId));
	const indexUserTable = userData[0].subscriptions.indexOf(channelId);
	const indexChannelTable = channelData[0].subscribers.indexOf(userId);

	userData[0].subscriptions.splice(indexUserTable, 1);
	channelData[0].subscribers.splice(indexChannelTable, 1);

	await db
		.update(users)
		.set({
			subscriptions: userData[0].subscriptions,
		})
		.where(eq(users.id, userId));
	await db
		.update(users)
		.set({
			subscribers: channelData[0].subscribers,
		})
		.where(eq(users.id, channelId));
	revalidatePath("/watch");
}
