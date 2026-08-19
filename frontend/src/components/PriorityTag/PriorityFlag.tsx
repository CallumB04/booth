import { twMerge } from "tailwind-merge";
import type { TicketPriority } from "../../api/tickets";
import { useMemo } from "react";

interface PriorityFlagProps {
    className?: string;
    priority: TicketPriority;
    size?: number;
}

// Shorthand for priority wherever a tag is too heavy
const PriorityFlag = ({
    className,
    priority,
    size = 11,
}: PriorityFlagProps) => {
    const colorClass = useMemo(() => {
        switch (priority) {
            case "low":
                return "text-ticket-priority-low";
            case "medium":
                return "text-ticket-priority-medium";
            case "high":
                return "text-ticket-priority-high";
        }
    }, [priority]);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={twMerge("shrink-0", colorClass, className)}
        >
            <path d="M4 20V4l8 5 8-5v16l-8-5z" />
        </svg>
    );
};

export default PriorityFlag;
