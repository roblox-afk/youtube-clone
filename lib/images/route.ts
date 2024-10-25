import { Hono } from "hono";
import { v2 as cloudinary } from "cloudinary";
import { encodeBase64 } from "hono/utils/encode";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const app = new Hono();

app.post(
	"/upload",
	zValidator(
		"form",
		z.object({
			image: z.instanceof(File).refine((file) => {
				return ACCEPTED_FILE_TYPES.includes(file.type);
			}, "File must be a PNG/JPG/WEBP/"),
		})
	),
	(c) =>
		c.req.parseBody().then(async (body) => {
			const image = body["image"] as File;
			const byteArrayBuffer = await image.arrayBuffer();
			const base64 = encodeBase64(byteArrayBuffer);
			const results = await cloudinary.uploader.upload(
				`data:${image.type};base64,${base64}`,
				{
					folder: "youtube-clone",
				}
			);
			return c.json(results);
		})
);

export default app;
