import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createNoteSchema } from "../../schema/notes";
import { fakeNotes } from "../../fakeNotes";

export const notesRoute = new Hono()
  .get("/", async (c) => {
    return c.json(fakeNotes);
  })
  .post("/", zValidator("json", createNoteSchema), async (c) => {
    const data = await c.req.valid("json");
    const note = createNoteSchema.parse(data);

    fakeNotes.push({
      ...note,
      id: fakeNotes.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return c.json(note);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const note = fakeNotes.find((note) => note.id === id);
    if (!note) {
      return c.notFound();
    }
    return c.json({ note });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeNotes.findIndex((note) => note.id === id);
    if (index === -1) {
      return c.notFound();
    }

    const deletedNote = fakeNotes.splice(index, 1)[0];
    return c.json({ note: deletedNote });
  });
