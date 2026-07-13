import { PlusIcon, UsersIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";
import Card from "../../components/Card/Card";
import EmptyStateCard from "../../components/EmptyStateCard/EmptyStateCard";

const TeamsPage = () => {
    usePageTitle("teams / booth");

    // empty teams array for testing no teams display
    // replace with react query database fetch when setup
    const teams = [];

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
                {teams.length === 0 && (
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
                )}
                {/* Grid of Teams */}
                <div className="grid grid-cols-3 gap-4"></div>
            </Page>
        </>
    );
};

export default TeamsPage;
