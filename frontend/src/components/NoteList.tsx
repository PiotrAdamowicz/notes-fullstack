import { useEffect, useState } from "react";
import type { Note } from "../../../types/notes";
// import { client } from "../lib/api";
import { hc } from "hono/client";
import type { ApiRoutes } from "../../../server/app.ts";
import { useQuery } from "@tanstack/react-query";

export const client = hc<ApiRoutes>("/");

async function getNotes() {
  const res = await client.api.notes.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export default function NoteList() {
  const { isPending, error, data, isFetched } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {isPending
        ? "..."
        : data.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </li>
          ))}
    </ul>
  );
}
