import auth from "@/lib/auth/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import images from "@/lib/images/route";
import videos from "@/lib/videos/route";
export const dynamic = "force-static";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
	.route("/auth", auth)
	.route("/images", images)
	.route("/videos", videos);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
