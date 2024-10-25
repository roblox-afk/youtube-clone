import auth from "@/lib/auth/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import images from "@/lib/images/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("", auth).route("/images", images);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
