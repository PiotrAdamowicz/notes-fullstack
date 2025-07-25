import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createNoteSchema } from "../../schema/notes";
import { getUser } from "../kinde";
import { db } from "../db/db";
import { notesTable } from "../db/schema/notes";
import { desc, eq } from "drizzle-orm";

export const notesRoute = new Hono()
  .get("/", getUser, async (c) => {
    if (c.error) {
      return c.json({ error: c.error.message }, 500);
    }
    const user = c.var.user;
    const notes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.userId, user.id))
      .orderBy(desc(notesTable.createdAt));

    return c.json(notes);
  })
  .post("/", getUser, zValidator("json", createNoteSchema), async (c) => {
    const data = await c.req.valid("json");
    const note = createNoteSchema.parse(data);
    const user = c.var.user;

    const result = await db
      .insert(notesTable)
      .values({
        ...note,
        userId: user.id,
      })
      .returning();

    c.status(201);
    return c.json(result);
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const note = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.id, id))
      .then((res) => res[0]);
    if (!note) {
      return c.notFound();
    }
    return c.json({ note });
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const deletedNote = await db
      .delete(notesTable)
      .where(eq(notesTable.id, id))
      .returning();
    if (!deletedNote) {
      return c.notFound();
    }

    return c.json({ note: deletedNote });
  });
