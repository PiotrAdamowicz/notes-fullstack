import { useState } from "react";
import type { NoteComponentProps } from "../../../../types/notes";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import NotePlaceholder from "./NotePlaceholder";
import { Button } from "../ui/button";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CardColorPickerPopover from "./CardColorPickerPopover";
import { containerId } from "../../consts/elementId";
import { usePatchNote } from "../../hooks/useQuerys";
import { useClickAway } from "@uidotdev/usehooks";

export default function Note({ note }: NoteComponentProps) {
    const [isActive, setIsActive] = useState(false);
    const patchNote = usePatchNote();

    const submitHandler = () => {
        if (isActive) {
            form.handleSubmit();
            setIsActive(false);
        }
    };
    const cardRef = useClickAway<HTMLDivElement>(() => {
        submitHandler();
    });

    const form = useForm({
        defaultValues: {
            title: note.title,
            content: note.content,
        },
        onSubmit: async ({ value }) => {
            const { title, content } = value;
            if (title !== note.title || content !== note.content) {
                patchNote.mutate({
                    noteId: note.id,
                    title,
                    content,
                });
            }
        },
    });

    return (
        <Dialog>
            <DialogTrigger className="relative">
                <NotePlaceholder
                    isActive={isActive}
                    setIsActive={setIsActive}
                    note={note}
                />
            </DialogTrigger>
            <DialogContent ref={cardRef} bg={note.color}>
                <DialogHeader>
                    <DialogTitle>
                        <form.Field
                            name="title"
                            children={(field) => {
                                return (
                                    <>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                            placeholder="Title"
                                            className="text-xl"
                                        />
                                    </>
                                );
                            }}
                        />
                    </DialogTitle>
                    <form.Field
                        name="content"
                        children={(field) => {
                            return (
                                <div>
                                    <Textarea
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value ?? ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        className="resize-none"
                                        placeholder="Create a note..."
                                    />
                                </div>
                            );
                        }}
                    />
                </DialogHeader>
                <DialogFooter id={containerId}>
                    <DialogClose asChild>
                        <div className="w-full flex">
                            <CardColorPickerPopover
                                color={note.color}
                                noteId={note.id}
                            />
                            <Button
                                variant="color"
                                onClick={() => submitHandler()}
                            >
                                Close
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
