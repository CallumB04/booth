import AnimateInView from "../../components/AnimateInView/AnimateInView";
import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";
import HomePageAIGrid from "./components/HomePageAIGrid";
import HomePageCTA from "./components/HomePageCTA";
import HomePageDemoMockup from "./components/HomePageDemoMockup";
import HomePageHero from "./components/HomePageHero";
import HomePageIntegrations from "./components/HomePageIntegrations";
import HomePagePricing from "./components/HomePagePricing";
import HomePageProductFeatures from "./components/HomePageProductFeatures";
import HomePageStatsMarquee from "./components/HomePageStatsMarquee";
import HomePageValueFeatures from "./components/HomePageValueFeatures";

// Full-bleed slanted green divider — breaks visual rhythm between sections
const SlantDivider = () => (
    <div className="home-page-divider bg-highlight relative left-1/2 my-8 h-3.5 w-screen -translate-x-1/2" />
);

const HomePage = () => {
    usePageTitle("booth / AI ticket system");

    return (
        <Page className="max-w-7xl space-y-0">
            <section>
                <HomePageHero />
            </section>
            <AnimateInView as="section">
                <HomePageValueFeatures />
            </AnimateInView>
            <AnimateInView as="section">
                <HomePageDemoMockup />
            </AnimateInView>
            <SlantDivider />
            <AnimateInView as="section" id="product">
                <HomePageProductFeatures />
            </AnimateInView>
            <AnimateInView as="section">
                <HomePageStatsMarquee />
            </AnimateInView>
            <AnimateInView as="section" id="ai">
                <HomePageAIGrid />
            </AnimateInView>
            <AnimateInView as="section" id="integrations">
                <HomePageIntegrations />
            </AnimateInView>
            <SlantDivider />
            <AnimateInView as="section" id="pricing">
                <HomePagePricing />
            </AnimateInView>
            <AnimateInView as="section">
                <HomePageCTA />
            </AnimateInView>
        </Page>
    );
};

export default HomePage;
