import type { RefObject, ReactNode } from "react";

export type AddNoteProps = {
    refetch: () => void;
};

export interface AddNoteFormProps extends AddNoteProps {
    children: ReactNode;
    setFormActive: React.Dispatch<React.SetStateAction<boolean>>;
}
