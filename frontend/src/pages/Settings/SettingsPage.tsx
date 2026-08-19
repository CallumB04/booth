import Page from "../../components/Page/Page";
import SideNav from "../../components/SideNav/SideNav";
import usePageTitle from "../../hooks/usePageTitle";

const SETTINGS_TABS = [
    { label: "agent" },
    { label: "sources" },
    { label: "members" },
    { label: "billing" },
];

const SettingsPage = () => {
    usePageTitle("settings / booth");

    return (
        <Page
            title="settings"
            // Settings is the one page whose sections earn a side column rather
            // than the horizontal Navigator every other page uses
            navigation={
                <SideNav
                    className="w-45"
                    options={SETTINGS_TABS}
                    defaultOptionLabel="agent"
                />
            }
        />
    );
};

export default SettingsPage;
