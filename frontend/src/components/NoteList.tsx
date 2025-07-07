import { useEffect, useState } from "react";
import type { Note } from "../../../types/notes";

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    }
    fetchNotes();
  }, []);
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  );
}
