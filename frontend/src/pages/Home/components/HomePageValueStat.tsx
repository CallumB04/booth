import { twMerge } from "tailwind-merge";

interface HomePageValueStatProps {
    className?: string;
    stat: string;
    statSuffix: string;
    description: string;
}

const HomePageValueStat = ({
    className,
    stat,
    statSuffix,
    description,
}: HomePageValueStatProps) => {
    return (
        <div className={twMerge("flex flex-col gap-3", className)}>
            <h2 className="text-text-primary text-2xl font-medium tracking-tight sm:text-3xl">
                <span className="text-highlight">{stat}</span> {statSuffix}
            </h2>
            <p className="text-text-secondary text-balance">{description}</p>
        </div>
    );
};

export default HomePageValueStat;
