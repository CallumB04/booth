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
import { BUTTON_ICON_SIZE } from "../../constants/icons";
import { useMemo, useState } from "react";

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

    // Current value in the search bar input
    const [searchValue, setSearchValue] = useState<string>("");

    const filteredTeams = useMemo(() => {
        // filter by search bar (name or description)
        return teams
            ? (teams?.filter(
                  (t) =>
                      t.name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                      t.description
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
              ) ?? [])
            : [];
    }, [teams, searchValue]);

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
                        onChange={(val) => setSearchValue(val)}
                    />
                    <Button variant="primary" className="min-w-max">
                        <PlusIcon size={BUTTON_ICON_SIZE} />
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
                                icon: <PlusIcon size={BUTTON_ICON_SIZE} />,
                                label: "Create your first Team",
                                onClick: () => {},
                            }}
                        />
                    ))}
                {/* Grid of Teams */}
                {teams && filteredTeams?.length >= 1 ? (
                    <TeamsGrid teams={filteredTeams} />
                ) : (
                    <EmptyStateCard
                        icon={<UsersIcon size={26} />}
                        title="No teams found with these filters"
                        description="Can't find the team you're looking for? Create it now and start assigning your members."
                        button={{
                            icon: <PlusIcon size={BUTTON_ICON_SIZE} />,
                            label: "Create a new Team",
                            onClick: () => {},
                        }}
                    />
                )}
            </Page>
        </>
    );
};

export default TeamsPage;
