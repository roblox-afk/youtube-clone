import { Hono } from "hono";
import { v2 as cloudinary } from "cloudinary";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "../db";
import { randomUUID } from "crypto";
import { NewVideo, videos } from "../db/schema";

const ACCEPTED_FILE_TYPES = ["video/mp4", "video/webm"];
const app = new Hono();

app.post(
	"/upload",
	zValidator(
		"form",
		z.object({
			video: z.instanceof(File).refine((file) => {
				return ACCEPTED_FILE_TYPES.includes(file.type);
			}, "File must be a MP4/"),
			title: z.string(),
		})
	),
	(c) =>
		c.req.parseBody().then(async (body) => {
			const video = body["video"] as File;
			const url = URL.createObjectURL(video);
			try {
				const result = await cloudinary.uploader.upload_large(url, {
					resource_type: "video",
				});

				URL.revokeObjectURL(url);

				const newVideo: NewVideo[] = await db
					.insert(videos)
					.values({
						id: randomUUID().toString(),
						title: ("Draft: " + body["title"]) as string,
						sourceUrl: result.secure_url,
					})
					.returning();

				return c.json({ video: newVideo });
			} catch (error) {
				return c.json({ error: error });
			}
		})
);

export default app;
