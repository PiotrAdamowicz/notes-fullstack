import {
    pgTable,
    boolean,
    text,
    serial,
    pgEnum,
    timestamp,
} from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull(),
    title: text("title").notNull(),
    isPinned: boolean("isPinned").default(false),
    isArchived: boolean("isArchived").default(false),
    isTrashed: boolean("isTrashed").default(false),
    content: text("content").default(""),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    color: pgEnum("color", [
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
        "orange",
        "default",
    ])().default("default"),
});
