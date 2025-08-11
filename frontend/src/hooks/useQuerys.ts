import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchNote, patchNoteColor } from "../lib/api";
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
