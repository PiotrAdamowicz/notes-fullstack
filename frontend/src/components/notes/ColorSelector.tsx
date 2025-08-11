import type { ColorType } from "../../../../types/utils";
import { NoteColors } from "../../../../types/enums";
import { bgVariant } from "../ui/dialog";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { usePatchNoteColor } from "../../hooks/useQuerys";

const colorOptionVariant = cva(
    "w-7 h-7 rounded-full bg-red-700 cursor-pointer transition-discrete border-1 hover:border-foreground",
    {
        variants: {
            isActive: {
                true: "border-primary",
                false: "shadow-sm border-foregraund",
            },
            bg: bgVariant,
        },
        defaultVariants: {
            isActive: false,
            bg: "default",
        },
    }
);

interface ColorSelectorProps extends React.ComponentProps<"div"> {
    noteId: number;
}

export default function ColorSelector({ color, noteId }: ColorSelectorProps) {
    const patchColor = usePatchNoteColor();

    const colorChange = (e, option: ColorType) => {
        e.stopPropagation();
        if (!color) return;
        patchColor.mutate({ noteId, color: option });
    };
    return Object.keys(NoteColors).map((option) => (
        <div
            onClick={(e) => colorChange(e, option as ColorType)}
            key={option}
            className={cn(
                colorOptionVariant({
                    bg: option as ColorType,
                    isActive: color === option,
                })
            )}
        />
    ));
}
