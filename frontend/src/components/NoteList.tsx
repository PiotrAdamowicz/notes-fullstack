import { hc } from "hono/client";
import type { ApiRoutes } from "../../../server/app.ts";
import type { Note } from "../../../types/notes";

export const client = hc<ApiRoutes>("/");

type NoteListProps = {
  isPending: boolean;
  error: { message: string } | null;
  notes: Note[];
};

export default function NoteList({ isPending, error, notes }: NoteListProps) {
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {isPending
        ? "..."
        : notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </li>
          ))}
    </ul>
  );
}
