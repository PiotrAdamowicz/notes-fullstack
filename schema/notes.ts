import z from "zod";

const titleSchema = z.string().max(100);
const contentSchema = z.string().nullable();

const noteSchema = z.object({
    id: z.number().int().positive(),
    userId: z.string(),
    title: titleSchema,
    isPinned: z.boolean().nullable(),
    isArchived: z.boolean().nullable(),
    isTrashed: z.boolean().nullable(),
    content: contentSchema,
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

const patchNoteSchema = noteSchema.omit({
    isPinned: true,
    isArchived: true,
    isTrashed: true,
    color: true,
    createdAt: true,
    updatedAt: true,
    id: true,
    userId: true,
});

export { noteSchema, createNoteSchema, colorSchema, patchNoteSchema };
