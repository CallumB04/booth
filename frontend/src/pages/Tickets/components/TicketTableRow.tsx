import { twMerge } from "tailwind-merge";
import type { Ticket } from "../../../api/tickets";
import PanelRow from "../../../components/Panel/PanelRow";
import PriorityTag from "../../../components/PriorityTag/PriorityTag";
import StatusTag from "../../../components/StatusTag/StatusTag";
import { TICKET_TABLE_COLUMNS } from "./TicketTable";

interface TicketTableRowProps {
    className?: string;
    ticket: Ticket;
}

const TicketTableRow = ({ className, ticket }: TicketTableRowProps) => {
    return (
        <PanelRow className={twMerge("grid", TICKET_TABLE_COLUMNS, className)}>
            {/* Title, with the ref and team beneath it */}
            <span className="flex min-w-0 flex-col gap-0.5">
                <p className="text-text-primary truncate text-[13px]">
                    {ticket.title}
                </p>
                <p className="text-text-faint font-mono text-[10px] lowercase">
                    tkt-{ticket.id} · frontend
                </p>
            </span>
            <StatusTag status={ticket.status} />
            <PriorityTag priority={ticket.priority} />
        </PanelRow>
    );
};

export default TicketTableRow;
