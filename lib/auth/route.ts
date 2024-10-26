import { Hono } from "hono";
import { auth } from "./auth";

const app = new Hono();

app.get("*", (c) => auth.handler(c.req.raw));
app.post("*", (c) => auth.handler(c.req.raw));

export default app;
