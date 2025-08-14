import type { RefObject, ReactNode } from "react";
import type { ColorType } from "./utils";

export type AddNoteProps = {
    refetch: () => void;
};

export interface AddNoteFormProps extends AddNoteProps {
    setFormActive: React.Dispatch<React.SetStateAction<boolean>>;
}
