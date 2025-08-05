import type { Note } from "../../../types/notes";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type NoteListProps = {
  isPending: boolean;
  error: { message: string } | null;
  notes: Note[];
};

export default function NoteList({ isPending, error, notes }: NoteListProps) {
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="sm:max-w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {isPending
        ? "..."
        : notes.map((note) => (
            <Card className="" key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>{note.content}</CardContent>
            </Card>
          ))}
    </div>
  );
}
