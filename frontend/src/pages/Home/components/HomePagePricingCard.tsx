import { CheckIcon } from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Card from "../../../components/Card/Card";

interface HomePagePricingCardProps {
    className?: string;
    tier: string;
    currency: string;
    price: string;
    pricePer?: string;
    period: string;
    features: string[];
    cta: ReactNode;
    featured?: boolean;
}

const HomePagePricingCard = ({
    className,
    tier,
    currency,
    price,
    pricePer,
    period,
    features,
    cta,
    featured,
}: HomePagePricingCardProps) => {
    return (
        <Card
            className={twMerge(
                "relative h-full w-full gap-6 p-8",
                featured && "ring-highlight shadow-highlight/20 shadow-xl ring-1",
                className
            )}
        >
            {featured && (
                <span className="bg-highlight text-btn-primary-text absolute -top-3 left-8 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
                    recommended
                </span>
            )}
            <div className="text-text-tertiary font-mono text-xs tracking-widest uppercase">
                {tier}
            </div>
            <div className="text-text-primary flex items-baseline gap-1">
                <span className="text-text-tertiary text-2xl">{currency}</span>
                <span className="text-5xl font-medium tracking-tight">
                    {price}
                </span>
                {pricePer && (
                    <span className="text-text-tertiary font-mono text-sm">
                        {pricePer}
                    </span>
                )}
            </div>
            <div className="text-text-tertiary font-mono text-xs">{period}</div>
            <ul className="flex flex-col gap-2.5">
                {features.map((feature) => (
                    <li
                        key={feature}
                        className="text-text-secondary flex items-start gap-2 text-sm"
                    >
                        <CheckIcon
                            size={16}
                            className="text-highlight mt-0.5 shrink-0"
                        />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-auto">{cta}</div>
        </Card>
    );
};

export default HomePagePricingCard;
