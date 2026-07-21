import type { MouseEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ClickableGroupProps {
    className?: string;
    children: ReactNode;
    title?: string;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const ClickableGroup = ({
    className,
    children,
    title,
    onClick,
}: ClickableGroupProps) => {
    return (
        <div
            className={twMerge(
                "hover:bg-surface-muted text-text-primary flex w-max cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors",
                className
            )}
            onClick={(e) => {
                e.stopPropagation();
                onClick && onClick(e);
            }}
            title={title}
        >
            {children}
        </div>
    );
};

export default ClickableGroup;
