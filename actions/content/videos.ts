"use server";
import { db } from "@/lib/db";
import {
	NewVideo,
	VideoRestrictions,
	videos,
	VideoStatus,
} from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { eq } from "drizzle-orm";

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
