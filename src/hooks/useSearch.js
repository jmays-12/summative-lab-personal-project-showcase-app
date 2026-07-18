import { useState, useRef, useEffect } from "react";

function useSearch(items, keys = ["name"]) {
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const filteredItems = items.filter((item) =>
        keys.some((key) =>
            item[key]?.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

    return { searchTerm, setSearchTerm, inputRef, filteredItems };
}

export default useSearch;
