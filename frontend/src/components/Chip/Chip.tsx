import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ChipProps {
    className?: string;
    children: ReactNode;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

// Compact filter pill, used in rows to narrow down a list
const Chip = ({
    className,
    children,
    selected,
    disabled,
    onClick,
}: ChipProps) => {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={twMerge(
                "flex h-9.5 w-max items-center gap-1.5 rounded-full border px-3.5 font-mono text-[11px] lowercase transition-colors select-none",
                selected
                    ? "bg-text-display border-text-display text-background"
                    : "border-input-border text-text-secondary hover:border-input-border-hover hover:text-text-primary bg-transparent",
                disabled
                    ? "border-btn-secondary-disabled-border bg-btn-secondary-disabled-bg text-text-disabled hover:border-btn-secondary-disabled-border hover:text-text-disabled cursor-not-allowed"
                    : "cursor-pointer",
                className
            )}
        >
            {children}
        </button>
    );
};

export default Chip;
