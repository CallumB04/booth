import { twMerge } from "tailwind-merge";
import type { SearchOption } from "./SearchPopup";

interface SearchPopupItemProps {
    className?: string;
    option: SearchOption;
    onClick?: () => void;
}

const SearchPopupItem = ({
    className,
    option,
    onClick,
}: SearchPopupItemProps) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                "hover:bg-surface-hover flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 transition-colors",
                className
            )}
        >
            <span className="text-text-primary flex-1 truncate text-[13px]">
                {option.label}
            </span>
            {option.meta && (
                <span className="text-text-disabled shrink-0 font-mono text-[10px] lowercase">
                    {option.meta}
                </span>
            )}
        </div>
    );
};

export default SearchPopupItem;
