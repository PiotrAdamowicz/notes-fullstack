import { NoteColors } from "../../../types/enums";
import { client } from "../lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";

type AddNoteProps = {
  refetch: () => void;
};

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

export default function AddNote({ refetch }: AddNoteProps) {
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
      const res = await client.api.notes.$post({ json: value });
      if (!res.ok) {
        throw new Error("Failed to add note");
      }
      //refresh the note list after adding a new note
      refetch();
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) =>
            !value
              ? "A first name is required"
              : value.length < 3
                ? "First name must be at least 3 characters"
                : undefined,
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }) => {
            return (
              value.includes("error") && 'No "error" allowed in first name'
            );
          },
        }}
        children={(field) => {
          // Avoid hasty abstractions. Render props are great!
          return (
            <>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Field
        name="content"
        validators={{
          onChange: ({ value }) =>
            !value
              ? "A first name is required"
              : value.length < 3
                ? "First name must be at least 3 characters"
                : undefined,
          onChangeAsyncDebounceMs: 500,
          onChangeAsync: async ({ value }) => {
            return (
              value.includes("error") && 'No "error" allowed in first name'
            );
          },
        }}
        children={(field) => {
          // Avoid hasty abstractions. Render props are great!
          return (
            <>
              <Label htmlFor={field.name}>Content</Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..Adding." : "Add Note"}
          </Button>
        )}
      />
    </form>
  );
}
