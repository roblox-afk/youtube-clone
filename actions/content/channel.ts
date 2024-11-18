"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getChannel(id: string) {
	const data = await db.select().from(users).where(eq(users.id, id));
	if (data[0] == null) return null;
	return data[0];
}
