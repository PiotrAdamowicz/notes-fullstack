import { hc } from "hono/client";
import type { ApiRoutes } from "../../../server/app";
import { queryOptions } from "@tanstack/react-query";
import type { ColorType } from "../../../types/utils";
import type { PatchNoteType } from "../../../types/notes";

export const client = hc<ApiRoutes>("/");

async function getCurrentUser() {
    const res = await client.api.me.$get();
    if (!res.ok) {
        throw new Error("server error");
    }
    const data = await res.json();
    return data;
}

export const userQueryOptions = queryOptions({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
});

export async function getNotes() {
    const res = await client.api.notes.$get();
    if (!res.ok) {
        throw new Error("server error");
    }
    const data = await res.json();
    return data;
}

export const notesQueryOptions = {
    queryKey: ["notes"],
    queryFn: getNotes,
    staleTime: 1000 * 60 * 5,
};

export async function patchNote(
    noteId: number,
    title: string,
    content: string | null
) {
    const res = await client.api.notes[":id{[0-9]+}"].$patch({
        param: { id: `${noteId}` },
        json: {
            title,
            content,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to update note");
    }
    return res.json();
}

export async function patchNoteColor(noteId: number, color: ColorType) {
    const res = await client.api.notes.color[":id{[0-9]+}"].$patch({
        param: { id: `${noteId}` },
        json: {
            color,
        },
    });
    if (!res.ok) {
        throw new Error("Failed to update note color");
    }
    return res.json();
}
