import { twMerge } from "tailwind-merge";
import type { TicketPriority } from "../../api/tickets";
import { useMemo } from "react";

interface PriorityTagProps {
    className?: string;
    priority: TicketPriority;
}

const PriorityTag = ({ className, priority }: PriorityTagProps) => {
    const colorClasses = useMemo(() => {
        switch (priority) {
            case "low":
                return "bg-ticket-priority-low/15 text-ticket-priority-low";
            case "medium":
                return "bg-ticket-priority-medium/15 text-ticket-priority-medium";
            case "high":
                return "bg-ticket-priority-high/15 text-ticket-priority-high";
        }
    }, [priority]);

    return (
        <div
            className={twMerge(
                "h-max w-max rounded px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider uppercase",
                colorClasses,
                className
            )}
        >
            {priority}
        </div>
    );
};

export default PriorityTag;
