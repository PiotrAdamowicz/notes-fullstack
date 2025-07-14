import { Hono } from "hono";
import { logger } from "hono/logger";
import { notesRoute } from "./routes/notes";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/auth";

const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => {
  return c.json({ message: "Hello, Hono!" });
});

const apiRoutes = app
  .basePath("/api")
  .route("/notes", notesRoute)
  .route("/", authRoute);

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
