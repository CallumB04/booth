import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CountBadgeVariant = "highlight" | "warning" | "neutral";

interface CountBadgeProps {
    className?: string;
    children: ReactNode;
    variant?: CountBadgeVariant;
}

// Small mono count sitting beside a heading or a nav item
const CountBadge = ({
    className,
    children,
    variant = "highlight",
}: CountBadgeProps) => {
    return (
        <span
            className={twMerge(
                "flex h-4 min-w-4.5 items-center justify-center rounded-[4px] px-1.5 font-mono text-[9.5px] tabular-nums",
                variant === "highlight" &&
                    "bg-highlight/14 text-highlight-soft",
                variant === "warning" && "bg-warning/14 text-warning",
                variant === "neutral" && "bg-surface-hover text-text-secondary",
                className
            )}
        >
            {children}
        </span>
    );
};

export default CountBadge;
