import { PlusIcon, UsersIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";
import EmptyStateCard from "../../components/EmptyStateCard/EmptyStateCard";
import { useQuery } from "@tanstack/react-query";
import { useOrganisation } from "../../contexts/OrganisationContext";
import { fetchTeams } from "../../api/teams";
import TeamsGrid from "./components/TeamsGrid";

const TeamsPage = () => {
    usePageTitle("teams / booth");

    const { activeOrganisation } = useOrganisation();

    // Load organisations on component mount
    const { data: teams } = useQuery({
        queryKey: ["teams", activeOrganisation?.id], // refetch when org changes
        queryFn: async () => {
            const teams = await fetchTeams(activeOrganisation?.id ?? "");
            return teams ?? [];
        },
    });

    return (
        <>
            <Sidebar />
            <Page
                title="Teams"
                description="View and manage the teams in your organisation and the people in them"
            >
                {/* Search bar and new team button */}
                <div className="flex w-full justify-between gap-4">
                    <SearchBar
                        placeholder="Search for team..."
                        containerClassName="w-full"
                        className="w-full"
                    />
                    <Button variant="primary" className="min-w-max">
                        <PlusIcon size={20} />
                        New Team
                    </Button>
                </div>
                {/* No teams display */}
                {!teams ||
                    (teams?.length === 0 && (
                        <EmptyStateCard
                            icon={<UsersIcon size={26} />}
                            title="No teams found"
                            description="Teams let booth route requests to the right
                                people. Create your first team now and start
                                assigning your members."
                            button={{
                                icon: <PlusIcon size={20} />,
                                label: "Create your first Team",
                                onClick: () => {},
                            }}
                        />
                    ))}
                {/* Grid of Teams */}
                {teams && teams?.length >= 1 && <TeamsGrid teams={teams} />}
            </Page>
        </>
    );
};

export default TeamsPage;
