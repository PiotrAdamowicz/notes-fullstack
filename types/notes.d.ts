import z from "zod";
import type { noteSchema } from "../schema/notes";

type Note = z.infer<typeof noteSchema>;

export { Note };
