import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import RequestOptionCard from "./components/RequestOptionCard";
import QuickRequestPreview from "./components/QuickRequestPreview";
import ChatPreview from "./components/ChatPreview";
import TranscriptPreview from "./components/TranscriptPreview";
import { REQUEST_OPTIONS } from "./requestOptions";

const RequestPage = () => {
    usePageTitle("new request / booth");

    return (
        <Page title="new request">
            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
                {REQUEST_OPTIONS.map((option) => (
                    <RequestOptionCard
                        key={option.mode}
                        option={option}
                        onOpen={() => {}}
                    >
                        {option.mode === "quick" && <QuickRequestPreview />}
                        {option.mode === "chat" && <ChatPreview />}
                        {option.mode === "transcript" && <TranscriptPreview />}
                    </RequestOptionCard>
                ))}
            </div>
        </Page>
    );
};

export default RequestPage;
