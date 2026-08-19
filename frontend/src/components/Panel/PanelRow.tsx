import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PanelRowProps {
    className?: string;
    children: ReactNode;
    unread?: boolean; // tints the row, used for inbox items
    onClick?: () => void;
}

// One line inside a Panel, hairline separated from the row below it
const PanelRow = ({ className, children, unread, onClick }: PanelRowProps) => {
    return (
        <div
            className={twMerge(
                "border-b-layout-border flex items-center gap-3.5 border-b px-4 py-3.5 transition-colors last:border-b-0",
                unread && "bg-highlight/4",
                onClick && "hover:bg-surface-hover cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default PanelRow;
