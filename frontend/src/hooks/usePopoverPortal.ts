import { useEffect, useState } from "react";

export function usePopoverPortal(containerId?: string) {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerId) {
            setContainer(null);
            return;
        }
        let el = document.getElementById(containerId);
        if (!el) {
            el = document.createElement("div");
            el.id = containerId;
            document.body.appendChild(el);
        }
        setContainer(el);
    }, [containerId]);

    return container;
}
