import z from "zod";
import type { createNoteSchema, noteSchema } from "../schema/notes";
import type { boolean } from "zod/v4";

export type NoteType = z.infer<typeof noteSchema>;
export interface NoteComponentProps {
    note: NoteType;
}
export type NewNote = z.infer<typeof createNoteSchema>;
export interface NotePlaceholderComponentProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    note: NoteType;
}
