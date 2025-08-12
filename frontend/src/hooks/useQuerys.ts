import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    deleteNote,
    notesQueryOptions,
    patchNote,
    patchNoteColor,
} from "../lib/api";
import type { ColorType } from "../../../types/utils";

export function usePatchNoteColor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ noteId, color }: { noteId: number; color: ColorType }) =>
            patchNoteColor(noteId, color),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
}

export function usePatchNote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            noteId,
            title,
            content,
        }: {
            noteId: number;
            title: string;
            content: string | null;
        }) => patchNote(noteId, title, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
}

export function useGetNotes() {
    const { isPending, error, data, refetch } = useQuery(notesQueryOptions);
    return { isPending, error, data, refetch };
}

export function useRemoveNote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (noteId: number) => deleteNote(noteId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
}
