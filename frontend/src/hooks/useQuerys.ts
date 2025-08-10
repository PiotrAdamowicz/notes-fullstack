import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchNoteColor } from "../lib/api";
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
