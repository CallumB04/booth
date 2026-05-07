import { twMerge } from "tailwind-merge";
import Marquee from "../../../components/Marquee/Marquee";

interface HomePageStatsMarqueeProps {
    className?: string;
}

const stats = [
    {
        headline: "any input",
        detail: "paragraph, transcript, direct message, chat",
    },
    { headline: "auto-assigned", detail: "categorised, prioritised, assigned" },
    {
        headline: "many integrations",
        detail: "slack · github · notion · and more",
    },
    {
        headline: "cross-functional",
        detail: "for teams of all skill levels",
    },
    {
        headline: "knowledge base",
        detail: "your company, providing context for the AI",
    },
];

const HomePageStatsMarquee = ({ className }: HomePageStatsMarqueeProps) => {
    return (
        <div
            className={twMerge(
                "bg-highlight border-y-highlight-hover relative left-1/2 w-screen -translate-x-1/2 border-y py-10",
                className
            )}
        >
            <Marquee durationSeconds={42}>
                {stats.map((stat, i) => (
                    <div key={i} className="flex items-center">
                        <div className="flex flex-col items-start gap-1 px-12">
                            <div className="text-btn-primary-text text-3xl font-medium tracking-tight">
                                {stat.headline}
                            </div>
                            <div className="text-btn-primary-text/80 font-mono text-[11px] tracking-widest uppercase">
                                {stat.detail}
                            </div>
                        </div>
                        <span className="text-btn-primary-text/60 font-mono text-lg">
                            ◆
                        </span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default HomePageStatsMarquee;
