import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import type { AddNoteProps } from "../../../../types/addnote";
import { Label } from "../ui/label";

export default function AddNote({ refetch }: AddNoteProps) {
    const [formActive, setFormActive] = useState(false);

    return (
        <div
            onClick={() => setFormActive(true)}
            className="cursor-pointer mt-8 mb-4 sm:max-w-3/5 mx-auto"
        >
            {formActive ? (
                <AddNoteForm refetch={refetch} setFormActive={setFormActive} />
            ) : (
                <Label className="cursor-pointer text-xl text-muted-foreground py-3 px-4 border rounded-md">
                    Create a note...
                </Label>
            )}
        </div>
    );
}
