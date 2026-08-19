import { PlusIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import Navigator from "../../components/Navigator/Navigator";
import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import { BUTTON_ICON_SIZE } from "../../constants/icons";

const KB_TABS = [{ label: "product" }, { label: "teams" }, { label: "people" }];

const KnowledgePage = () => {
    usePageTitle("knowledge / booth");

    return (
        <Page
            title="what booth knows"
            navigation={
                <Navigator options={KB_TABS} defaultOptionLabel="product" />
            }
            actions={
                <Button variant="primary">
                    <PlusIcon size={BUTTON_ICON_SIZE} />
                    add entry
                </Button>
            }
        />
    );
};

export default KnowledgePage;
