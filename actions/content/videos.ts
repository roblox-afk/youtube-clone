"use server";
import { db } from "@/lib/db";
import {
	NewVideo,
	users,
	VideoRestrictions,
	videos,
	VideoStatus,
} from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { eq } from "drizzle-orm";
import { getChannel } from "./channel";

export async function uploadVideo(
	fileBytes: ArrayBuffer,
	fileTitle: string,
	channelId: string
) {
	const buffer = Buffer.from(fileBytes);
	const result: UploadApiResponse | undefined = await new Promise((resolve) => {
		cloudinary.uploader
			.upload_stream(
				{
					resource_type: "video",
					folder: "youtube-clone",
				},
				(error, uploadResult) => {
					return resolve(uploadResult);
				}
			)
			.end(buffer);
	});

	if (result === undefined) return;

	const newVideo: NewVideo[] = await db
		.insert(videos)
		.values({
			id: randomUUID().toString(),
			channelId: channelId,
			title: fileTitle,
			sourceUrl: result.secure_url,
			visibility: VideoStatus.DRAFT,
			restrictions: VideoRestrictions.NONE,
		})
		.returning();

	return { videoData: newVideo, fileData: result };
}

export async function getVideos(channelId: string) {
	return await db.select().from(videos).where(eq(videos.channelId, channelId));
}

export async function getAllVideos() {
	return await db.select().from(videos);
}

export async function getVideo(id: string) {
	const query = await db.select().from(videos).where(eq(videos.id, id));
	return query[0];
}

export async function likeVideo(id: string, userId: string) {
	const query = await getVideo(id);
	const userQuery = await getChannel(userId);

	if (userQuery?.likedVideos.includes(id)) return;

	if (userQuery?.disLikedVideos.includes(id)) {
		await undislikeVideo(id, userId);
	}

	await db
		.update(videos)
		.set({
			likes: query.likes + 1,
		})
		.where(eq(videos.id, id));

	const newLikedVideos = [...(userQuery?.likedVideos ?? []), id];

	await db
		.update(users)
		.set({
			likedVideos: newLikedVideos,
		})
		.where(eq(users.id, userId));
}

export async function unlikeVideo(id: string, userId: string) {
	const query = await getVideo(id);
	const userQuery = await getChannel(userId);

	if (userQuery?.likedVideos.includes(id) == false || userQuery === null)
		return;
	await db
		.update(videos)
		.set({
			likes: query.likes - 1,
		})
		.where(eq(videos.id, id));
	const indexUserTable = userQuery?.likedVideos.indexOf(id);

	userQuery.likedVideos.splice(indexUserTable, 1);

	await db
		.update(users)
		.set({
			likedVideos: userQuery.likedVideos,
		})
		.where(eq(users.id, userId));
}

export async function dislikeVideo(id: string, userId: string) {
	const query = await getVideo(id);
	const userQuery = await getChannel(userId);

	if (userQuery?.disLikedVideos.includes(id)) return;

	if (userQuery?.likedVideos.includes(id)) {
		await unlikeVideo(id, userId);
	}

	await db
		.update(videos)
		.set({
			disLikes: query.disLikes + 1,
		})
		.where(eq(videos.id, id));

	const newDisLikedVideos = [...(userQuery?.disLikedVideos ?? []), id];

	await db
		.update(users)
		.set({
			disLikedVideos: newDisLikedVideos,
		})
		.where(eq(users.id, userId));
}

export async function undislikeVideo(id: string, userId: string) {
	const query = await getVideo(id);
	const userQuery = await getChannel(userId);

	if (userQuery?.disLikedVideos.includes(id) == false || userQuery === null)
		return;
	await db
		.update(videos)
		.set({
			disLikes: query.disLikes - 1,
		})
		.where(eq(videos.id, id));
	const indexUserTable = userQuery?.disLikedVideos.indexOf(id);

	userQuery.disLikedVideos.splice(indexUserTable, 1);

	await db
		.update(users)
		.set({
			disLikedVideos: userQuery.disLikedVideos,
		})
		.where(eq(users.id, userId));
}
