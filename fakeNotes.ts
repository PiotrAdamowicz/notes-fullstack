import type { Note } from "./types/notes";

export const fakeNotes: Note[] = [
  {
    id: 1,
    title: "Shopping List",
    content: "Eggs, Milk, Bread",
    color: "yellow",
    isPinned: false,
    isArchived: false,
    isTrashed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Discuss project milestones and deadlines.",
    color: "blue",
    isPinned: true,
    isArchived: false,
    isTrashed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
