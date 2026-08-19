import { twMerge } from "tailwind-merge";
import type { Ticket } from "../../../api/tickets";
import Panel from "../../../components/Panel/Panel";
import TicketTableRow from "./TicketTableRow";

interface TicketTableProps {
    className?: string;
    tickets: Ticket[];
}

// Columns are shared by the heading row and every row underneath it. The ref
// and team ride under the title rather than taking columns of their own.
export const TICKET_TABLE_COLUMNS = "grid-cols-[1fr_110px_96px]";

const TicketTable = ({ className, tickets }: TicketTableProps) => {
    return (
        <Panel className={className}>
            {/* Column headings */}
            <div
                className={twMerge(
                    "border-b-layout-border bg-background text-text-tertiary grid h-9.5 items-center gap-3.5 border-b px-4 font-mono text-[9.5px] tracking-[0.09em] uppercase",
                    TICKET_TABLE_COLUMNS
                )}
            >
                <span>ticket</span>
                <span>status</span>
                <span>priority</span>
            </div>
            {tickets.map((t) => (
                <TicketTableRow key={t.id} ticket={t} />
            ))}
        </Panel>
    );
};

export default TicketTable;
