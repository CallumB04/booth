import LinkButton from "../../components/Button/LinkButton";
import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";

const NotFoundPage = () => {
    usePageTitle("page not found / booth");

    return (
        <div className="mt-topbar-height min-h-[calc(100vh-var(--topbar-height))]">
            <Page
                title="Page not found"
                actions={
                    <LinkButton to="/" variant="primary">
                        Back to booth
                    </LinkButton>
                }
            />
        </div>
    );
};

export default NotFoundPage;
