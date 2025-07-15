import { pgTable, boolean, text, serial, pgEnum } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  title: text("title").notNull(),
  isPinned: boolean("isPinned").default(false),
  isArchived: boolean("isArchived").default(false),
  isTrashed: boolean("isTrashed").default(false),
  content: text("content").default(""),
  createdAt: text("createdAt").default(new Date().toISOString()),
  updatedAt: text("updatedAt").default(new Date().toISOString()),
  color: pgEnum("color", [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "transparent",
  ])().default("transparent"),
});
