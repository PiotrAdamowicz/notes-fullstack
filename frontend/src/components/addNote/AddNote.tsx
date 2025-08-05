import { useEffect, useRef, useState} from "react";
import AddNoteForm from "./AddNoteForm";
import type { AddNoteProps } from "./addnote";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function AddNote({ refetch }: AddNoteProps) {
	const [formActive, setFormActive] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);
	const formInstanceRef = useRef<{ submit: () => void }>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				formRef.current &&
				!formRef.current.contains(event.target as Node)
			) {
				formInstanceRef.current?.submit();
				setFormActive(false);
			}
		}

		if (formActive) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [formActive]);

	const closeForm = (e:React.MouseEvent<HTMLButtonElement> )=>{
		e.stopPropagation()
		formInstanceRef.current?.submit();
		setFormActive(false)
	}

	return (
		<div onClick={()=>setFormActive(true)} className="cursor-pointer mt-8 mb-4">
			{formActive ?
				<AddNoteForm
					refetch={refetch}
					formRef={formRef}
					formInstanceRef={formInstanceRef}
					>
					<Button variant="ghost" onClick={closeForm}
						type="button"
					>
						Close
					</Button>
				</AddNoteForm>
				:
				<Label className="cursor-pointer text-xl text-muted-foreground py-3 px-4 border rounded-md max-w-3/5 mx-auto" >
					Create a note...
				</Label>
			}
		</div>
	);
}
