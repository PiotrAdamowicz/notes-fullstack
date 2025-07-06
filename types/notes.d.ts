import z from "zod";

type Note = z.infer<typeof noteSchema>;

export { Note };
