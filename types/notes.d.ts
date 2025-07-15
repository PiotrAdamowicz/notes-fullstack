import z from "zod";
import type { createNoteSchema, noteSchema } from "../schema/notes";

type Note = z.infer<typeof noteSchema>;
type NewNote = z.infer<typeof createNoteSchema>;
enum NoteColors {
  red = "red",
  green = "green",
  blue = "blue",
  yellow = "yellow",
  purple = "purple",
  orange = "orange",
  transparent = "transparent",
}

export { Note, NewNote, NoteColors };
