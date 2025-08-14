import { Palette } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTriggerStopPropagation,
} from "../ui/popover";
import { usePopoverPortal } from "../../hooks/usePopoverPortal";
import type { ColorType } from "../../../../types/utils";
import ColorSelector from "./ColorSelector";
import type { NoteColors } from "../../../../types/enums";

export default function AddNoteColorPickerPopover({
    color,
    setCurrentColor,
}: {
    color: ColorType;
    setCurrentColor: React.Dispatch<React.SetStateAction<NoteColors>>;
}) {
    const portalContainer = usePopoverPortal("addColorPopover");

    const onColorSelect = ({
        color,
        e,
    }: {
        color: ColorType;
        e: React.MouseEvent<HTMLDivElement>;
    }) => {
        e.stopPropagation();
        console.log("Selected color:", color);
        if (color !== null) {
            setCurrentColor(color as NoteColors);
        }
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
                        onSelect={(color, e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onColorSelect({ e, color });
                        }}
                        value={color}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
