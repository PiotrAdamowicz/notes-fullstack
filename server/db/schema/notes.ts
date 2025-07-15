import { pgTable, boolean, text, serial } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  isPinned: boolean("is_pinned").default(false),
  isArchived: boolean("is_archived").default(false),
  isTrashed: boolean("is_trashed").default(false),
  content: text("content").default(""),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
  color: text("color").default("transparent"),
});
