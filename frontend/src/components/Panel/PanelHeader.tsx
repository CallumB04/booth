import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import CountBadge from "../CountBadge/CountBadge";

interface PanelHeaderProps {
    className?: string;
    title?: string;
    count?: number; // badge beside the title
    action?: ReactNode; // link or control pinned to the right
}

const PanelHeader = ({ className, title, count, action }: PanelHeaderProps) => {
    return (
        <div
            className={twMerge(
                "border-b-layout-border flex h-11 shrink-0 items-center justify-between gap-4 border-b px-4",
                className
            )}
        >
            <div className="flex items-center gap-2.5">
                {title && (
                    <span className="text-text-primary text-[13px] font-normal lowercase">
                        {title}
                    </span>
                )}
                {count !== undefined && <CountBadge>{count}</CountBadge>}
            </div>
            {action}
        </div>
    );
};

export default PanelHeader;
