import { useMemo } from "react";
import { PlusIcon, TicketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import EmptyStateCard from "../../components/EmptyStateCard/EmptyStateCard";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import TicketTable from "./components/TicketTable";
import {
    ALL_TICKET_PRIORITIES,
    ALL_TICKET_STATUSES,
    type Ticket,
} from "../../api/tickets";
import { fetchTeams } from "../../api/teams";
import { useOrganisation } from "../../contexts/OrganisationContext";
import { BUTTON_ICON_SIZE } from "../../constants/icons";
import usePageTitle from "../../hooks/usePageTitle";

// "all" heads every filter, so nothing is hidden until you choose to hide it
const STATUS_OPTIONS = [
    { label: "all", value: "" },
    ...ALL_TICKET_STATUSES.map((status) => ({
        label: status,
        value: status,
    })),
];

const PRIORITY_OPTIONS = [
    { label: "any", value: "" },
    ...ALL_TICKET_PRIORITIES.map((priority) => ({
        label: priority,
        value: priority,
    })),
];

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

    const { activeOrganisation } = useOrganisation();

    // Load teams on component mount, so the filter offers the real ones
    const { data: teams } = useQuery({
        queryKey: ["teams", activeOrganisation?.id], // refetch when org changes
        queryFn: async () => {
            const teams = await fetchTeams(activeOrganisation?.id ?? "");
            return teams ?? [];
        },
        enabled: !!activeOrganisation?.id, // no organisation, no request
    });

    const teamOptions = useMemo(
        () => [
            { label: "all", value: "" },
            ...(teams ?? []).map((t) => ({ label: t.name, value: t.id })),
        ],
        [teams]
    );

    return (
        <Page
            title="tickets"
            navigation={
                <>
                    <SearchBar
                        containerClassName="w-full sm:w-64"
                        className="w-full"
                        placeholder="Search tickets..."
                    />
                    <Dropdown
                        size="sm"
                        inlineLabel="status"
                        options={STATUS_OPTIONS}
                        defaultValue=""
                    />
                    <Dropdown
                        size="sm"
                        inlineLabel="team"
                        options={teamOptions}
                        defaultValue=""
                    />
                    <Dropdown
                        size="sm"
                        inlineLabel="priority"
                        options={PRIORITY_OPTIONS}
                        defaultValue=""
                    />
                </>
            }
            actions={
                <Button variant="primary">
                    <PlusIcon size={BUTTON_ICON_SIZE} />
                    new ticket
                </Button>
            }
        >
            {/* Tickets */}
            {tickets.length === 0 ? (
                <EmptyStateCard
                    icon={<TicketIcon size={22} />}
                    title="No tickets found"
                    description="There are currently no tickets in your organisation. Create your first ticket now and start building."
                    button={{
                        icon: <PlusIcon size={BUTTON_ICON_SIZE} />,
                        label: "Create your first ticket",
                        onClick: () => {},
                    }}
                />
            ) : (
                <TicketTable tickets={tickets} />
            )}
        </Page>
    );
};

export default TicketsPage;
