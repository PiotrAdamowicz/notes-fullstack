import { createFileRoute } from "@tanstack/react-router";
import NoteList from "../../components/notes/NoteList";
import AddNote from "../../components/addNote/AddNote";
import { useGetNotes } from "../../hooks/useQuerys";

export const Route = createFileRoute("/_authenticated/")({
    component: Index,
});

export default function Index() {
    const { isPending, error, data, refetch } = useGetNotes();

    if (error)
        return (
            <div className="text-red-600 text-center">
                Error: {error.message}
            </div>
        );

    return (
        <>
            <div className="max-w-full">
                <AddNote refetch={refetch} />
                <NoteList notes={data} isPending={isPending} />
            </div>
        </>
    );
}
