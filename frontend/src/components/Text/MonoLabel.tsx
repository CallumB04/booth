import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MonoLabelProps {
    className?: string;
    children: ReactNode;
}

// Small mono caption used for section headings and metadata throughout the app
const MonoLabel = ({ className, children }: MonoLabelProps) => {
    return (
        <span
            className={twMerge(
                "text-text-tertiary font-mono text-[10px] tracking-[0.11em] uppercase",
                className
            )}
        >
            {children}
        </span>
    );
};

export default MonoLabel;
