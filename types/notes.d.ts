import z from "zod";
import type { createNoteSchema, noteSchema } from "../schema/notes";

type Note = z.infer<typeof noteSchema>;
type NewNote = z.infer<typeof createNoteSchema>;

export { Note, NewNote };
