import { twMerge } from "tailwind-merge";
import Card from "../Card/Card";
import MonoLabel from "../Text/MonoLabel";

type StatCaptionVariant = "default" | "success" | "danger" | "warning";

interface StatCardProps {
    className?: string;
    label: string;
    value: string;
    caption?: string;
    captionVariant?: StatCaptionVariant;
    onClick?: () => void;
}

const StatCard = ({
    className,
    label,
    value,
    caption,
    captionVariant = "default",
    onClick,
}: StatCardProps) => {
    return (
        <Card
            className={twMerge("w-full gap-2.5", className)}
            variant="default"
            onClick={onClick}
        >
            {/* Label */}
            <MonoLabel>{label}</MonoLabel>
            {/* Figure, set in the display serif */}
            <p className="text-text-display text-[26px] leading-none font-light tracking-[-0.03em] tabular-nums">
                {value}
            </p>
            {/* Optional caption, a delta or a note under the figure */}
            {caption && (
                <span
                    className={twMerge(
                        "font-mono text-[10.5px] tabular-nums",
                        captionVariant === "default" && "text-text-tertiary",
                        captionVariant === "success" && "text-highlight-soft",
                        captionVariant === "warning" && "text-warning",
                        captionVariant === "danger" && "text-danger"
                    )}
                >
                    {caption}
                </span>
            )}
        </Card>
    );
};

export default StatCard;
