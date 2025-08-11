import { useEffect, useRef, type RefObject } from "react";

export function useClickOutside<T extends HTMLElement>(
    callback: () => void
): RefObject<T | null> {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!ref.current) return;
            if (!ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [callback]);

    return ref;
}
