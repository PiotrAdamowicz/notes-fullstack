import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { useForm } from "@tanstack/react-form";
import type { AddNoteFormProps } from "../../../../types/addnote";
import { NoteColors } from "../../../../types/enums";
import { client } from "../../lib/api";
import { cva } from "class-variance-authority";
import { bgVariant } from "../ui/dialog";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import AddNoteColorPickerPopover from "../notes/AddNoteColorPickerPopover";
import { Button } from "../ui/button";

export default function AddNoteForm({
    refetch,
    setFormActive,
}: AddNoteFormProps) {
    const [currentColor, setCurrentColor] = useState(NoteColors.default);

    const noteForm = useForm({
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
            // prevent empty note creation
            if (!value.title && !value.content) return;

            const res = await client.api.notes.$post({
                json: { ...value, color: currentColor },
            });
            if (!res.ok) throw new Error("Failed to add note");

            refetch();
            noteForm.reset();
        },
    });

    const submitAndClose = () => {
        noteForm.handleSubmit();
        setFormActive(false);
    };

    // close form on click outside
    const formRef = useClickAway<HTMLFormElement>(() => {
        if (noteForm.state.values.title || noteForm.state.values.content) {
            submitAndClose();
        } else {
            setFormActive(false);
        }
    });

    const formVariants = cva("border border-input rounded-md px-4 py-3", {
        variants: { bg: bgVariant },
        defaultVariants: { bg: "default" },
    });

    return (
        <form
            ref={formRef}
            className={cn(formVariants({ bg: currentColor }))}
            onSubmit={(e) => {
                e.preventDefault();
                noteForm.handleSubmit();
            }}
        >
            <noteForm.Field
                name="title"
                children={(field) => (
                    <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="text"
                        placeholder="Title"
                        className="text-xl"
                    />
                )}
            />

            <noteForm.Field
                name="content"
                children={(field) => (
                    <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="resize-none"
                        placeholder="Create a note..."
                    />
                )}
            />

            <AddNoteColorPickerPopover
                color={currentColor}
                setCurrentColor={setCurrentColor}
            />

            <Button variant="ghost" type="button" onClick={submitAndClose}>
                Close
            </Button>
        </form>
    );
}
