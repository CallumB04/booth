import { twMerge } from "tailwind-merge";
import HomePageValueStat from "./HomePageValueStat";
import HomePageSectionLabel from "./HomePageSectionLabel";

interface HomePageValueFeaturesProps {
    className?: string;
}

const HomePageValueFeatures = ({ className }: HomePageValueFeaturesProps) => {
    return (
        <div className={twMerge("space-y-10 px-4 pt-6 pb-24", className)}>
            <HomePageSectionLabel label="why booth" />
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                <HomePageValueStat
                    stat="any input"
                    statSuffix=""
                    description="a paragraph, a meeting transcript, a message to the booth bot, or a back and forth chat. all of them turn into structured tickets."
                />
                <HomePageValueStat
                    stat="auto-assigned"
                    statSuffix=""
                    description="every new ticket gets categorised, prioritised, and assigned to whoever it fits best. uncertain decisions go to an approval queue for manual assignment."
                />
                <HomePageValueStat
                    stat="always learning"
                    statSuffix=""
                    description="every conversation, ticket and integration becomes part of your company's knowledge base. the longer you use booth, the smarter it gets."
                />
            </div>
        </div>
    );
};

export default HomePageValueFeatures;
