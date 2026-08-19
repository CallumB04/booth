import { twMerge } from "tailwind-merge";
import type { TicketPriority } from "../../api/tickets";
import { useMemo } from "react";
import PriorityFlag from "./PriorityFlag";

interface PriorityTagProps {
    className?: string;
    priority: TicketPriority;
}

const PriorityTag = ({ className, priority }: PriorityTagProps) => {
    const colorClasses = useMemo(() => {
        switch (priority) {
            case "low":
                return "border-ticket-priority-low/32 text-ticket-priority-low";
            case "medium":
                return "border-ticket-priority-medium/30 text-ticket-priority-medium";
            case "high":
                return "border-ticket-priority-high/26 text-ticket-priority-high";
        }
    }, [priority]);

    return (
        <div
            className={twMerge(
                "flex h-6 w-max items-center gap-1.5 rounded-[5px] border px-2.5 font-mono text-[10px] lowercase",
                colorClasses,
                className
            )}
        >
            <PriorityFlag priority={priority} size={10} />
            {priority}
        </div>
    );
};

export default PriorityTag;
