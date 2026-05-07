import { twMerge } from "tailwind-merge";
import Button from "../../../components/Button/Button";
import HomePagePricingCard from "./HomePagePricingCard";
import HomePageSectionLabel from "./HomePageSectionLabel";

interface HomePagePricingProps {
    className?: string;
}

const HomePagePricing = ({ className }: HomePagePricingProps) => {
    return (
        <div className={twMerge("space-y-10 px-4 py-24", className)}>
            <HomePageSectionLabel label="pricing" />
            <div className="max-w-3xl space-y-3">
                <h2 className="text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                    simple pricing. no per-seat surprises.
                </h2>
                <p className="text-text-secondary text-lg">
                    start free, scale when you're ready. every plan includes
                    smart inbox, integrations, and unlimited tickets.
                </p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
                <HomePagePricingCard
                    tier="free"
                    currency="£"
                    price="0"
                    period="forever · up to 10 users"
                    features={[
                        "unlimited tickets",
                        "weekly limits on AI functionality",
                        "slack + github integration",
                        "7-day activity history",
                    ]}
                    cta={
                        <Button variant="secondary" className="w-full">
                            Get started
                        </Button>
                    }
                />
                <HomePagePricingCard
                    featured
                    tier="pro"
                    currency="£"
                    price="8"
                    pricePer="/ user / mo"
                    period="billed monthly · unlimited users"
                    features={[
                        "everything in free",
                        "unlimited AI functionality",
                        "all integrations (notion, jira, granola, etc)",
                        "unlimited history & exports",
                    ]}
                    cta={
                        <Button variant="primary" className="w-full">
                            Start free trial
                        </Button>
                    }
                />
            </div>
        </div>
    );
};

export default HomePagePricing;
