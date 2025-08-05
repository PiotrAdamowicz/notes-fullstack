import { useEffect, useState } from "react";
import type{ NoteComponentProps} from "../../../../types/notes"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function Note ({note}: NoteComponentProps){
    const [isActive, setIsActive] = useState(false)
    const cardRef = useClickOutside<HTMLDivElement>(() => setIsActive(false));

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
  }, []);

    return(
        <Card
            ref={cardRef}
            isActive={isActive}
            onClick={()=>setIsActive(true)}
            onBlur={()=>setIsActive(false)}
        >
            <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>{note.content}</CardContent>
        </Card>
    )
}