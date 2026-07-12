import { twMerge } from "tailwind-merge";
import type { TicketStatus } from "../../api/tickets";
import { useMemo } from "react";

interface StatusDotProps {
    className?: string;
    status: TicketStatus;
}

const StatusDot = ({ className, status }: StatusDotProps) => {
    const colorClass = useMemo(() => {
        switch (status) {
            case "resolved":
                return "bg-ticket-resolved";
            case "in-progress":
                return "bg-ticket-in-progress";
            case "unassigned":
                return "bg-ticket-unassigned";
            case "paused":
                return "bg-ticket-paused";
            case "cancelled":
                return "bg-ticket-cancelled";
        }
    }, [status]);

    return (
        <div
            className={twMerge("size-2.5 rounded-full", colorClass, className)}
        />
    );
};

export default StatusDot;
