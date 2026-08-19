import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import PanelHeader from "./PanelHeader";

interface PanelProps {
    className?: string;
    contentClassName?: string; // div containing the panel contents
    children?: ReactNode;
    title?: string;
    count?: number; // badge beside the title
    action?: ReactNode; // link or control pinned to the right of the header
    padded?: boolean; // pad the contents, leave off when filling with rows
}

// Bordered container that holds rows or a chart, the workhorse of every app page
const Panel = ({
    className,
    contentClassName,
    children,
    title,
    count,
    action,
    padded,
}: PanelProps) => {
    return (
        <div
            className={twMerge(
                "border-surface-border bg-surface w-full overflow-hidden rounded-[10px] border",
                className
            )}
        >
            {(title || action) && (
                <PanelHeader title={title} count={count} action={action} />
            )}
            <div className={twMerge(padded && "p-5", contentClassName)}>
                {children}
            </div>
        </div>
    );
};

export default Panel;
