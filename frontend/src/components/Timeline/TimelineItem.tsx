import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TimelineItemProps {
    className?: string;
    children?: ReactNode; // the entry body, drawn in a bubble when present
    avatar: ReactNode; // avatar or icon at the start of the rule
    actor: string;
    verb?: string; // what they did, e.g. "left an update"
    time?: string;
    last?: boolean; // drop the connecting rule under the final entry
}

const TimelineItem = ({
    className,
    children,
    avatar,
    actor,
    verb,
    time,
    last,
}: TimelineItemProps) => {
    return (
        <div className={twMerge("flex gap-3.5", className)}>
            {/* Avatar and the rule running down to the next entry */}
            <div className="flex shrink-0 flex-col items-center">
                {avatar}
                {!last && (
                    <div className="bg-layout-border my-1.5 w-px flex-1" />
                )}
            </div>
            <div className={twMerge("min-w-0 flex-1", !last && "pb-5")}>
                <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
                    <span className="text-text-primary text-[13px] font-semibold">
                        {actor}
                    </span>
                    {verb && (
                        <span className="text-text-tertiary text-[12.5px]">
                            {verb}
                        </span>
                    )}
                    {time && (
                        <span className="text-text-faint font-mono text-[10px]">
                            {time}
                        </span>
                    )}
                </div>
                {children && (
                    <div className="border-surface-border bg-surface rounded-xl border px-4 py-3">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimelineItem;
