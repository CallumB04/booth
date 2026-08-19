import Button from "../../components/Button/Button";
import Navigator from "../../components/Navigator/Navigator";
import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";

const INBOX_TABS = [
    { label: "all" },
    { label: "mentions" },
    { label: "assigned" },
    { label: "agent" },
];

const InboxPage = () => {
    usePageTitle("inbox / booth");

    return (
        <Page
            title="inbox"
            navigation={
                <Navigator options={INBOX_TABS} defaultOptionLabel="all" />
            }
            actions={
                <Button variant="secondary" onClick={() => {}}>
                    mark all read
                </Button>
            }
        />
    );
};

export default InboxPage;
