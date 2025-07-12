import { hc } from "hono/client";
import type { ApiRoutes } from "../../../server/app.ts";
import type { Note } from "../../../types/notes";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
    <div className="flex gap-4">
      {isPending
        ? "..."
        : notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>{note.content}</CardContent>
            </Card>
          ))}
    </div>
  );
}
