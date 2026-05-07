import { twMerge } from "tailwind-merge";

interface HomePageSectionLabelProps {
    className?: string;
    label: string;
}

const HomePageSectionLabel = ({
    className,
    label,
}: HomePageSectionLabelProps) => {
    return (
        <div
            className={twMerge(
                "text-text-tertiary border-b-layout-border flex items-center justify-between border-b pb-3 font-mono text-xs tracking-wider uppercase",
                className
            )}
        >
            <span>/ {label}</span>
            <span className="text-highlight">■</span>
        </div>
    );
};

export default HomePageSectionLabel;
