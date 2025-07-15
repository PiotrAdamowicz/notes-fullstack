import z from "zod";

const noteSchema = z.object({
  id: z.number().int().positive(),
  userId: z.string(),
  title: z.string().min(3).max(100),
  isPinned: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isTrashed: z.boolean().optional(),
  content: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  color: z
    .enum(["red", "green", "blue", "yellow", "purple", "orange", "transparent"])
    .optional(),
});

const createNoteSchema = noteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export { noteSchema, createNoteSchema };
