import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import Sidebar from "../../layout/Sidebar/Sidebar";

const InboxPage = () => {
    usePageTitle("inbox / booth");

    return (
        <>
            <Sidebar />
            <Page
                title="Inbox"
                description="Your mentions, updates, and things that need a response"
            ></Page>
        </>
    );
};

export default InboxPage;
