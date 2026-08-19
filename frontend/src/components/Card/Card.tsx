import { twMerge } from "tailwind-merge";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import type { ReactNode } from "react";

type CardVariant = "default" | "muted" | "highlight" | "border" | "dashed";
type CardSize = "default" | "sm" | "xs";

interface CardProps {
    className?: string;
    children?: ReactNode;
    variant?: CardVariant;
    size?: CardSize;
    title?: string;
    description?: string;
    onClick?: () => void;
}

const getPaddingFromSize = (size: CardSize) => {
    switch (size) {
        case "default":
            return "p-4.5";
        case "sm":
            return "p-3.5";
        case "xs":
            return "p-2.5";
    }
};

const Card = ({
    className,
    children,
    variant = "default",
    size = "default",
    title,
    description,
    onClick,
}: CardProps) => {
    return (
        <div
            className={twMerge(
                "border-surface-border flex w-max flex-col gap-3 rounded-[10px] border transition-colors",
                getPaddingFromSize(size),
                variant === "default" && "bg-surface",
                variant === "muted" && "bg-surface-muted",
                // Anything the agent produced, or a note that needs marking out
                variant === "highlight" && "border-highlight/18 bg-highlight/5",
                variant === "border" && "bg-transparent",
                variant === "dashed" && "bg-surface border-dashed",
                onClick && "hover:border-surface-border-hover cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {/* Card Header */}
            {(title || description) && (
                <div className="space-y-1">
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
