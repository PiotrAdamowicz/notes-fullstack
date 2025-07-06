import { Hono } from "hono";
import { logger } from "hono/logger";
import { notesRoute } from "./routes/notes";

const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

app.route("/api/notes", notesRoute);

export default app;
