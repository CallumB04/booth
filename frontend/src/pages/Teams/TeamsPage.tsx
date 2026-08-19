import { PlusIcon, UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import EmptyStateCard from "../../components/EmptyStateCard/EmptyStateCard";
import TeamsGrid from "./components/TeamsGrid";
import { useOrganisation } from "../../contexts/OrganisationContext";
import { fetchTeams } from "../../api/teams";
import { BUTTON_ICON_SIZE } from "../../constants/icons";
import usePageTitle from "../../hooks/usePageTitle";

const TeamsPage = () => {
    usePageTitle("teams / booth");

    const { activeOrganisation } = useOrganisation();

    // Load teams on component mount
    const { data: teams } = useQuery({
        queryKey: ["teams", activeOrganisation?.id], // refetch when org changes
        queryFn: async () => {
            const teams = await fetchTeams(activeOrganisation?.id ?? "");
            return teams ?? [];
        },
        enabled: !!activeOrganisation?.id, // no organisation, no request
    });

    // Current value in the search bar input
    const [searchValue, setSearchValue] = useState<string>("");

    const filteredTeams = useMemo(() => {
        // filter by search bar (name or description)
        return teams && teams.length >= 1
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
        <Page
            title="teams"
            navigation={
                <SearchBar
                    placeholder="Search teams by name or description..."
                    containerClassName="w-full sm:w-96"
                    className="w-full"
                    onChange={(val) => setSearchValue(val)}
                />
            }
            actions={
                <Button variant="primary">
                    <PlusIcon size={BUTTON_ICON_SIZE} />
                    new team
                </Button>
            }
        >
            {/* Grid of Teams */}
            {teams && filteredTeams.length >= 1 ? (
                <TeamsGrid teams={filteredTeams} />
            ) : (
                <EmptyStateCard
                    icon={<UsersIcon size={24} />}
                    title="No teams found"
                    description="Teams let booth route requests to the right people. Create your first team now and start assigning your members."
                    button={{
                        icon: <PlusIcon size={BUTTON_ICON_SIZE} />,
                        label: "Create a new team",
                        onClick: () => {},
                    }}
                />
            )}
        </Page>
    );
};

export default TeamsPage;
