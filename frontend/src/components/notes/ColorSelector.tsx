import type { ColorType } from "../../../../types/utils";
import { NoteColors } from "../../../../types/enums";
import { bgVariant } from "../ui/dialog";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

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

interface ColorSelectorProps extends React.ComponentProps<"div"> {}

export default function ColorSelector({ color }: ColorSelectorProps) {
    const colorChange = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (color) {
            // Handle color change logic here, e.g., update note color
            console.log(`Color changed to: ${color}`);
        } else {
            console.warn("No color provided for selection.");
    }
    return Object.keys(NoteColors).map((option) => (
        <div
        onClick={colorChange}
            className={cn(
                colorOptionVariant({
                    bg: option as ColorType,
                    isActive: color === option,
                })
            )}
        />
    ));
}
