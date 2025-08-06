import type { NotePlaceholderComponentProps } from "../../../../types/notes";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function NotePlaceholder({
    cardRef,
    isActive,
    setIsActive,
    note,
}: NotePlaceholderComponentProps) {
    return (
        <Card
            bg={note.color}
            ref={cardRef}
            isActive={isActive}
            onClick={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
        >
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>{note.content}</CardContent>
        </Card>
    );
}
