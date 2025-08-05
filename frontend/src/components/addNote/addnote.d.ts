import type { RefObject, ReactNode } from "react";

export type AddNoteProps = {
	refetch: () => void;
};

export interface AddNoteFormProps extends AddNoteProps {
	children: ReactNode;
	formRef: RefObject<HTMLFormElement | null>;
	formInstanceRef: RefObject<{ submit: () => void } | null>;
}