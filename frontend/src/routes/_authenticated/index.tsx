import { createFileRoute } from "@tanstack/react-router";
import NoteList from "../../components/NoteList";
import { useQuery } from "@tanstack/react-query";
import AddNote from "../../components/addNote/AddNote";
import { client } from "../../lib/api";

export const Route = createFileRoute("/_authenticated/")({
	component: Index,
});

async function getNotes() {
	const res = await client.api.notes.$get();
	if (!res.ok) {
		throw new Error("server error");
	}
	const data = await res.json();
	return data;
}

export default function Index() {
	const { isPending, error, data, refetch } = useQuery({
		queryKey: ["notes"],
		queryFn: getNotes,
	});

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
