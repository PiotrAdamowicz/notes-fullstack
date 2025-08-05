import { NoteColors } from "../../../../types/enums";
import { client } from "../../lib/api";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { AddNoteFormProps } from "./addnote";
import { useEffect } from "react";

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<em>{field.state.meta.errors.join(", ")}</em>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}

export default function AddNoteForm({
	children,
	refetch,
	formRef,
	formInstanceRef,
}: AddNoteFormProps) {
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
			color: NoteColors.transparent,
		},
		onSubmit: async ({ value }) => {
			console.log(value)
			if(!value.title || !value.content ) return;
			const res = await client.api.notes.$post({ json: value });
			if (!res.ok) {
				throw new Error("Failed to add note");
			}
			//refresh the note list after adding a new note
			refetch();
			form.reset();
		},
	});

	useEffect(() => {
		if (formInstanceRef) {
			formInstanceRef.current = {
				submit: () => form.handleSubmit(),
			};
		}
	}, [form, formInstanceRef]);

	return (
		<form
			className="max-w-3/5 mx-auto border border-input rounded-md px-4 py-3"
			ref={formRef}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
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
								onChange={(e) => field.handleChange(e.target.value)}
								type="text"
								placeholder='Title'
								className="text-xl"
							/>
							<FieldInfo field={field} />
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
								onChange={(e) => field.handleChange(e.target.value)}
								className="resize-none"
								placeholder="Create a note..."
							/>
							<FieldInfo field={field} />
						</>
					);
				}}
			/>
			<div className="flex justify-end">
			{children}
			</div>
		</form>
	);
}
