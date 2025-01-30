import * as React from "react";

export function useMediaQuery(query: string) {
    const [value, setValue] = React.useState(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    React.useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQueryList = window.matchMedia(query);

        function onChange(event: MediaQueryListEvent) {
            setValue(event.matches);
        }

        mediaQueryList.addEventListener("change", onChange);

        setValue(mediaQueryList.matches);

        return () => mediaQueryList.removeEventListener("change", onChange);
    }, [query]);

    return value;
}
