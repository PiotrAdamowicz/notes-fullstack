import type { NoteType } from "../../../../types/notes";
import Note from "./Note";
import NoteListSkeleton from "./NoteListSkeleton";

type NoteListProps = {
    notes?: NoteType[];
    isPending?: boolean;
};

export default function NoteList({ notes, isPending }: NoteListProps) {
    return (
        <div className="sm:max-w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {!isPending && notes ? (
                notes.map((note) => <Note note={note} key={note.id} />)
            ) : (
                <NoteListSkeleton />
            )}
        </div>
    );
}
