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

interface ColorSelectorProps {
    value?: ColorType;
    options?: ColorType[];
    onSelect?: (color: ColorType, e: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
}

export default function ColorSelector({
    value,
    options = Object.keys(NoteColors) as ColorType[],
    onSelect,
    className,
}: ColorSelectorProps) {
    return (
        <div className={cn("flex gap-2", className)}>
            {options.map((option) => (
                <div
                    key={option}
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect?.(option, e);
                    }}
                    className={cn(
                        colorOptionVariant({
                            bg: option,
                            isActive: value === option,
                        })
                    )}
                />
            ))}
        </div>
    );
}
