import { useEffect, useState } from "react";
import type { NoteComponentProps } from "../../../../types/notes";

import { useClickOutside } from "../../hooks/useClickOutside";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import NotePlaceholder from "./NotePlaceholder";

export default function Note({ note }: NoteComponentProps) {
    const [isActive, setIsActive] = useState(false);
    const cardRef = useClickOutside<HTMLDivElement>(() => setIsActive(false));

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setIsActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Dialog>
            <DialogTrigger className="relative">
                <NotePlaceholder
                    cardRef={cardRef}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    note={note}
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{note.title}</DialogTitle>
                    <DialogDescription>{note.content}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
