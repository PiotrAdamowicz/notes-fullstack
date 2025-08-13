import { Palette } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTriggerStopPropagation,
} from "../ui/popover";
import { usePopoverPortal } from "../../hooks/usePopoverPortal";
import type { ColorType } from "../../../../types/utils";
import ColorSelector from "./ColorSelector";
import { usePatchNoteColor } from "../../hooks/useQuerys";

export default function CardColorPickerPopover({
    color,
    noteId,
}: {
    color: ColorType;
    noteId: number;
}) {
    const portalContainer = usePopoverPortal("cardColorPopover");
    const patchColor = usePatchNoteColor();
    const colorChange = ({
        color,
        noteId,
    }: {
        color: ColorType;
        noteId: number;
    }) => {
        if (!color) return;
        patchColor.mutate({ noteId, color });
    };
    return (
        <div className="py-2 w-full">
            <Popover>
                <PopoverTriggerStopPropagation>
                    <Palette className="cursor-pointer w-5 h-5" />
                </PopoverTriggerStopPropagation>
                <PopoverContent
                    className="flex gap-2"
                    container={portalContainer}
                >
                    <ColorSelector
                        onColorSelect={colorChange}
                        noteId={noteId}
                        color={color ?? undefined}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
