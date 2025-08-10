import { Palette } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTriggerStopPropagation,
} from "../ui/popover";
import { usePopoverPortal } from "../../hooks/usePopoverPortal";
import { containerId } from "../../consts/elementId";
import type { ColorType } from "../../../../types/utils";
import ColorSelector from "./ColorSelector";

export default function CardColorPickerPopover({
    color,
}: {
    color: ColorType;
}) {
    const portalContainer = usePopoverPortal(containerId);
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
                    <ColorSelector color={color ?? undefined} />
                </PopoverContent>
            </Popover>
        </div>
    );
}
