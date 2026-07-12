import type { Ticket } from "../../../api/tickets";
import Card from "../../../components/Card/Card";
import TicketTableHeading from "./TicketTableHeading";
import TicketTableRow from "./TicketTableRow";

const mockTickets: Ticket[] = [
    {
        id: "0",
        status: "in-progress",
        priority: "high",
        title: "Onboarding emails not sending to new signups",
        description: "Example description",
        created_at: "",
    },
    {
        id: "1",
        status: "cancelled",
        priority: "low",
        title: "Pricing page layout broken on mobile",
        description: "Example description",
        created_at: "",
    },
    {
        id: "2",
        status: "resolved",
        priority: "low",
        title: "Export invoices as PDF",
        description: "Example description",
        created_at: "",
    },
    {
        id: "3",
        status: "in-progress",
        priority: "medium",
        title: "Add SSO login for enterprise trial",
        description: "Example description",
        created_at: "",
    },
    {
        id: "4",
        status: "unassigned",
        priority: "high",
        title: "Dashboard widgets flicker on refresh",
        description: "Example description",
        created_at: "",
    },
    {
        id: "5",
        status: "paused",
        priority: "medium",
        title: "CSV import fails above 50k rows",
        description: "Example description",
        created_at: "",
    },
];

const TicketTable = () => {
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
                {mockTickets.map((t) => (
                    <TicketTableRow key={t.id} ticket={t} />
                ))}
            </div>
        </div>
    );
};

export default TicketTable;
