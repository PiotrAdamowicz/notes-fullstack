import { NoteColors } from "../../../../types/enums";
import { client } from "../../lib/api";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "@tanstack/react-form";
import type { AddNoteFormProps } from "../../../../types/addnote";
import { useClickAway } from "@uidotdev/usehooks";
import { Button } from "../ui/button";

export default function AddNoteForm({
    refetch,
    setFormActive,
}: AddNoteFormProps) {
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
            if (!value.title || !value.content) return;
            const res = await client.api.notes.$post({ json: value });
            if (!res.ok) {
                throw new Error("Failed to add note");
            }
            //refresh the note list after adding a new note
            refetch();
            form.reset();
        },
    });

    const closeForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("submiting");
        e.stopPropagation();
        form.handleSubmit();
        setFormActive(false);
    };

    return (
        <form
            className="border border-input rounded-md px-4 py-3"
            ref={formRef}
        >
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
            <Button variant="ghost" onClick={closeForm} type="button">
                Close
            </Button>
        </form>
    );
}
