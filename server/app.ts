import { Hono } from "hono";
import { logger } from "hono/logger";
import { notesRoute } from "./routes/notes";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

app.route("/api/notes", notesRoute);

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
