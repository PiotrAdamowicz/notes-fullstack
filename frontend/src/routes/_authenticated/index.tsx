import { createFileRoute } from "@tanstack/react-router";
import NoteList from "../../components/notes/NoteList";
import { useQuery } from "@tanstack/react-query";
import AddNote from "../../components/addNote/AddNote";
import { notesQueryOptions } from "../../lib/api";

export const Route = createFileRoute("/_authenticated/")({
    component: Index,
});

export default function Index() {
    const { isPending, error, data, refetch } = useQuery(notesQueryOptions);

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className="max-w-full">
                <AddNote refetch={refetch} />
                <NoteList notes={data} isPending={isPending} error={error} />
            </div>
        </>
    );
}
