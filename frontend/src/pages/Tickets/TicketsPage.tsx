import { PlusIcon, TicketIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Navigator from "../../components/Navigator/Navigator";
import { useState } from "react";
import TicketTable from "./components/TicketTable";
import type { Ticket } from "../../api/tickets";
import EmptyStateCard from "../../components/EmptyStateCard/EmptyStateCard";

const tickets: Ticket[] = [
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

const TicketsPage = () => {
    usePageTitle("tickets / booth");

    const [_statusView, setStatusView] = useState<string>("");
    const [_priorityView, setPriorityView] = useState<string>("");

    return (
        <>
            <Sidebar />
            <Page
                title="Tickets"
                description="Search, filter, and browse every ticket in your organisation"
            >
                {/* Search bar and key buttons */}
                <div className="flex w-full justify-between gap-4">
                    <SearchBar
                        placeholder="Search for ticket..."
                        containerClassName="w-full"
                        className="w-full"
                    />
                    <Button variant="primary" className="min-w-max">
                        <PlusIcon size={20} />
                        New Ticket
                    </Button>
                </div>
                {/* Navigators */}
                <div className="flex gap-4">
                    {/* Ticket Status Navigator */}
                    <Navigator
                        options={[
                            {
                                label: "All",
                                onClick: () => setStatusView(""),
                            },
                            {
                                label: "In Progress",
                                onClick: () => setStatusView("in-progress"),
                            },
                            {
                                label: "Unassigned",
                                onClick: () => setStatusView("unassigned"),
                            },
                            {
                                label: "Paused",
                                onClick: () => setStatusView("paused"),
                            },
                            {
                                label: "Resolved",
                                onClick: () => setStatusView("resolved"),
                            },
                            {
                                label: "Cancelled",
                                onClick: () => setStatusView("cancelled"),
                            },
                        ]}
                        defaultOptionLabel="All"
                    />
                    {/* Ticket Priority Navigator */}
                    <Navigator
                        options={[
                            {
                                label: "All",
                                onClick: () => setPriorityView(""),
                            },
                            {
                                label: "Low",
                                onClick: () => setPriorityView("low"),
                            },
                            {
                                label: "Medium",
                                onClick: () => setPriorityView("medium"),
                            },
                            {
                                label: "High",
                                onClick: () => setPriorityView("high"),
                            },
                        ]}
                        defaultOptionLabel="All"
                    />
                </div>
                {/* No tickets card */}
                {tickets.length === 0 && (
                    <EmptyStateCard
                        icon={<TicketIcon size={26} />}
                        title="No tickets found"
                        description="There are currently no tickets in your organisation. Create your first ticket now and start building."
                        button={{
                            icon: <PlusIcon size={20} />,
                            label: "Create your first Ticket",
                            onClick: () => {},
                        }}
                    />
                )}
                {/* Ticket Table */}
                {tickets.length >= 1 && <TicketTable tickets={tickets} />}
            </Page>
        </>
    );
};

export default TicketsPage;
