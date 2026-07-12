import { twMerge } from "tailwind-merge";
import type { Ticket } from "../../../api/tickets";
import PriorityTag from "../../../components/PriorityTag/PriorityTag";
import StatusDot from "../../../components/StatusDot/StatusDot";

interface TicketTableRowProps {
    className?: string;
    ticket: Ticket;
}

const TicketTableRow = ({ className, ticket }: TicketTableRowProps) => {
    return (
        <span
            className={twMerge(
                "not-last-of-type:border-b-layout-border bg-surface flex items-center py-3 pr-4 not-last-of-type:border-b",
                className
            )}
        >
            <span className="flex w-12 items-center justify-center">
                <StatusDot status={ticket.status} />
            </span>
            <span className="flex flex-1 flex-col">
                <p className="text-sm">{ticket.title}</p>
                <p className="text-text-disabled font-mono text-xs">
                    TKT-{ticket.id} · {ticket.status}
                </p>
            </span>
            <span className="w-28">
                <PriorityTag priority={ticket.priority} />
            </span>
            <p className="text-text-secondary w-36 text-sm">Frontend</p>
            <p className="text-text-secondary w-36 text-sm">Callum B.</p>
        </span>
    );
};

export default TicketTableRow;
