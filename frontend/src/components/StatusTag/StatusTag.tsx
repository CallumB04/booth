import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import type { TicketStatus } from "../../api/tickets";
import StatusDot from "../StatusDot/StatusDot";

interface StatusTagProps {
    className?: string;
    status: TicketStatus;
}

// Ticket status shown as a dot plus its label, pairs with PriorityTag
const StatusTag = ({ className, status }: StatusTagProps) => {
    const colorClasses = useMemo(() => {
        switch (status) {
            case "resolved":
                return "bg-ticket-resolved/12 text-ticket-resolved";
            case "in-progress":
                return "bg-ticket-in-progress/12 text-ticket-in-progress";
            case "todo":
                return "bg-ticket-todo/12 text-ticket-todo";
            case "unassigned":
                return "bg-ticket-unassigned/12 text-ticket-unassigned";
            case "paused":
                return "bg-ticket-paused/12 text-ticket-paused";
            case "cancelled":
                return "bg-ticket-cancelled/12 text-ticket-cancelled";
        }
    }, [status]);

    return (
        <div
            className={twMerge(
                "flex h-6 w-max items-center gap-1.5 rounded-[5px] px-2.5 font-mono text-[10px] lowercase",
                colorClasses,
                className
            )}
        >
            <StatusDot status={status} className="size-[5px]" />
            {status}
        </div>
    );
};

export default StatusTag;
