import { useState } from "react";
import type { NoteComponentProps } from "../../../../types/notes";

import { useClickOutside } from "../../hooks/useClickOutside";
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

export default function Note({ note }: NoteComponentProps) {
    const [isActive, setIsActive] = useState(false);
    const cardRef = useClickOutside<HTMLDivElement>(() => {
        form.handleSubmit();
        setIsActive(false);
    });

    const form = useForm({
        defaultValues: {
            title: note.title,
            content: note.content,
        },
        onSubmit: async ({ value }) => {
            // console.log(value);
        },
    });

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
            <DialogContent bg={note.color}>
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
                                            value={field.state.value}
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
                                        value={field.state.value}
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
                            <Button variant="color">Close</Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
