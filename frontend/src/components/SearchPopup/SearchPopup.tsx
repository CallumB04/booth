import { useState, type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { SearchIcon } from "lucide-react";
import SearchPopupItem from "./SearchPopupItem";

export type SearchOption = {
    label: string;
    value: string;
    meta?: string; // right hand hint, e.g. the section the page sits in
};

export type SearchGroup = {
    label: string;
    options: SearchOption[];
};

interface SearchPopupProps {
    className?: string;
    groups: SearchGroup[];
    placeholder?: string;
    onSelect?: (option: SearchOption) => void;
    closePopup?: () => void;
}

// Site search, opened from the topbar. Filters the pages you can jump to -
// nothing more than that.
const SearchPopup = ({
    className,
    groups,
    placeholder,
    onSelect,
    closePopup,
}: SearchPopupProps) => {
    const [query, setQuery] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    // Drop options that don't match, then groups left with nothing in them
    const filteredGroups = groups
        .map((group) => ({
            ...group,
            options: group.options.filter((o) =>
                o.label.toLowerCase().includes(query.trim().toLowerCase())
            ),
        }))
        .filter((group) => group.options.length >= 1);

    return (
        <dialog
            className="fixed top-0 left-0 z-99 flex h-screen w-screen justify-center bg-black/62 p-4 pt-30"
            onMouseDown={closePopup}
        >
            <div
                className={twMerge(
                    "bg-surface-raised border-popup-border h-max w-full max-w-[520px] overflow-hidden rounded-xl border shadow-2xl",
                    className
                )}
                // prevent close if mouse is dragged and unclicks outside the popup
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Query line */}
                <div className="border-b-layout-border flex items-center gap-2.5 border-b px-4 py-3.5">
                    <SearchIcon
                        size={15}
                        className="text-text-disabled shrink-0"
                    />
                    <input
                        autoFocus
                        placeholder={placeholder ?? "search pages..."}
                        value={query}
                        onChange={handleChange}
                        className="placeholder:text-text-disabled text-text-primary flex-1 bg-transparent text-[14px] outline-none"
                    />
                </div>

                {/* Matching pages */}
                <div className="flex max-h-88 flex-col gap-0.5 overflow-y-auto p-2">
                    {filteredGroups.length === 0 ? (
                        <p className="text-text-disabled px-2.5 py-6 text-center text-[12.5px] lowercase">
                            nothing matches that
                        </p>
                    ) : (
                        filteredGroups.map((group) => (
                            <div
                                key={group.label}
                                className="flex flex-col gap-0.5"
                            >
                                <span className="text-text-disabled px-2.5 pt-2 pb-1.5 font-mono text-[9.5px] tracking-[0.11em] uppercase">
                                    {group.label}
                                </span>
                                {group.options.map((o) => (
                                    <SearchPopupItem
                                        key={o.value}
                                        option={o}
                                        onClick={() => onSelect && onSelect(o)}
                                    />
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </dialog>
    );
};

export default SearchPopup;
