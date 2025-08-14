import { NoteColors } from "../../../../types/enums";
import { client } from "../../lib/api";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "@tanstack/react-form";
import type { AddNoteFormProps } from "../../../../types/addnote";
import { useClickAway } from "@uidotdev/usehooks";
import { Button } from "../ui/button";
import AddNoteColorPickerPopover from "../notes/AddNoteColorPickerPopover";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { bgVariant } from "../ui/dialog";
import { useState } from "react";

export default function AddNoteForm({
    refetch,
    setFormActive,
}: AddNoteFormProps) {
    const [currentColor, setCurrentColor] = useState(NoteColors.default);

    const submitHandler = () => {
        form.handleSubmit();
        setFormActive(false);
    };
    const formRef = useClickAway<HTMLFormElement>(() => {
        submitHandler();
    });

    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            userId: "",
            isPinned: false,
            isArchived: false,
            isTrashed: false,
            createdAt: "",
            updatedAt: "",
            color: NoteColors.default,
        },
        onSubmit: async ({ value }) => {
            if (!value.title) return;
            const res = await client.api.notes.$post({
                json: { ...value, color: currentColor },
            });
            if (!res.ok) {
                throw new Error("Failed to add note");
            }
            refetch();
            form.reset();
        },
    });

    const closeForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        form.handleSubmit();
        setFormActive(false);
    };

    const formVariants = cva("border border-input rounded-md px-4 py-3", {
        variants: {
            bg: bgVariant,
        },
        defaultVariants: {
            bg: "default",
        },
    });

    return (
        <form className={cn(formVariants({ bg: currentColor }))} ref={formRef}>
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
                                    field.handleChange(e.target.value)
                                }
                                type="text"
                                placeholder="Title"
                                className="text-xl"
                            />
                        </>
                    );
                }}
            />
            <form.Field
                name="content"
                children={(field) => {
                    return (
                        <>
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
                        </>
                    );
                }}
            />
            <AddNoteColorPickerPopover
                color={currentColor}
                setCurrentColor={setCurrentColor}
            />
            <Button variant="ghost" onClick={closeForm} type="button">
                Close
            </Button>
        </form>
    );
}
