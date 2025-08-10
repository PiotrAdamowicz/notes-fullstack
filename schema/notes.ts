import z from "zod";

const noteSchema = z.object({
    id: z.number().int().positive(),
    userId: z.string(),
    title: z.string().min(3).max(100),
    isPinned: z.boolean().nullable(),
    isArchived: z.boolean().nullable(),
    isTrashed: z.boolean().nullable(),
    content: z.string().nullable(),
    createdAt: z.string().datetime().nullable(),
    updatedAt: z.string().datetime().nullable(),
    color: z
        .enum(["red", "green", "blue", "yellow", "purple", "orange", "default"])
        .nullable(),
});

const createNoteSchema = noteSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

const colorSchema = z.object({
    color: z
        .enum(["red", "green", "blue", "yellow", "purple", "orange", "default"])
        .nullable(),
});

export { noteSchema, createNoteSchema, colorSchema };
