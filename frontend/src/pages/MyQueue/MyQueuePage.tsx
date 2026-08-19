import Dropdown from "../../components/Dropdown/Dropdown";
import Page from "../../components/Page/Page";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
    ACTIVE_TICKET_STATUSES,
    ALL_TICKET_PRIORITIES,
} from "../../api/tickets";
import usePageTitle from "../../hooks/usePageTitle";

// Your queue only holds work that is still yours to move - anything
// unassigned, resolved or cancelled has left it
const STATUS_OPTIONS = [
    { label: "all", value: "" },
    ...ACTIVE_TICKET_STATUSES.map((status) => ({
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

const MyQueuePage = () => {
    usePageTitle("my queue / booth");

    return (
        <Page
            title="my queue"
            navigation={
                <>
                    <SearchBar
                        containerClassName="w-full sm:w-64"
                        className="w-full"
                        placeholder="Search your queue..."
                    />
                    <Dropdown
                        size="sm"
                        inlineLabel="status"
                        options={STATUS_OPTIONS}
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
        />
    );
};

export default MyQueuePage;
