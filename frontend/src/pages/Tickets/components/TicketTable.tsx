import type { Ticket } from "../../../api/tickets";
import TicketTableHeading from "./TicketTableHeading";
import TicketTableRow from "./TicketTableRow";

interface TicketTableProps {
    tickets: Ticket[];
}

const TicketTable = ({ tickets }: TicketTableProps) => {
    return (
        <div className="border-layout-border w-full gap-0 rounded-lg border">
            {/* Table Header */}
            <span className="border-b-layout-border flex w-full border-b py-2.5 pr-4 pl-12">
                <TicketTableHeading text="Ticket" className="flex-1" />
                <TicketTableHeading text="Priority" className="w-28" />
                <TicketTableHeading text="Team" className="w-36" />
                <TicketTableHeading text="Assignee" className="w-36" />
            </span>
            {/* Table Contents */}
            <div className="flex w-full flex-col">
                {tickets.map((t) => (
                    <TicketTableRow key={t.id} ticket={t} />
                ))}
            </div>
        </div>
    );
};

export default TicketTable;
