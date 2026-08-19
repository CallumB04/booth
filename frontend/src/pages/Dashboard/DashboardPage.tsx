import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import { useUser } from "../../contexts/UserContext";

const DashboardPage = () => {
    usePageTitle("dashboard / booth");

    const { userProfile } = useUser();

    return (
        <Page
            title={
                <>
                    welcome back
                    {userProfile?.first_name && (
                        <span className="normal-case">
                            , {userProfile.first_name}
                        </span>
                    )}
                </>
            }
        />
    );
};

export default DashboardPage;
