import { Skeleton } from "../ui/skeleton";

export default function NoteListSkeleton() {
    return new Array(10).fill("").map((_, key) => (
        <div className="w-full inline h-30 p-1" key={key}>
            <Skeleton className="w-full h-full" />
        </div>
    ));
}
