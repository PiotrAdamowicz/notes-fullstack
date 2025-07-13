import { createFileRoute } from "@tanstack/react-router";
import NoteList from "../components/NoteList";
import type { ApiRoutes } from "../../../server/app";
import { hc } from "hono/client";
import { useQuery } from "@tanstack/react-query";
import AddNote from "../components/AddNote";

export const client = hc<ApiRoutes>("/");
export const Route = createFileRoute("/")({
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
      <AddNote refetch={refetch} />
      <NoteList notes={data} isPending={isPending} error={error} />
    </>
  );
}
