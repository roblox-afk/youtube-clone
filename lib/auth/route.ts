import { Hono } from "hono";
import { auth } from "./auth";

const app = new Hono();

app.get("/auth/*", (c) => auth.handler(c.req.raw));
app.post("/auth/*", (c) => auth.handler(c.req.raw));

app.get("/hello", (c) => c.json({ hello: "world" }));

export default app;
