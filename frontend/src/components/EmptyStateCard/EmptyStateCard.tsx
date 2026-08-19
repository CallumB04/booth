import { twMerge } from "tailwind-merge";
import Card from "../Card/Card";
import Button from "../Button/Button";
import type { ReactNode } from "react";

type EmptyStateCardButton = {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
};

interface EmptyStateCardProps {
    className?: string;
    icon: ReactNode;
    title: string;
    description: string;
    button?: EmptyStateCardButton;
}

const EmptyStateCard = ({
    className,
    icon,
    title,
    description,
    button,
}: EmptyStateCardProps) => {
    return (
        <Card
            variant="dashed"
            className={twMerge(
                "w-full items-center gap-4 px-8 py-12",
                className
            )}
        >
            <div className="text-highlight bg-highlight/10 border-highlight/18 rounded-lg border p-3.5">
                {icon}
            </div>
            <div className="space-y-1.5 text-center">
                <p className="text-text-primary text-[16px] font-normal tracking-[-0.01em] lowercase">
                    {title}
                </p>
                <p className="text-text-tertiary mx-auto max-w-96 text-[13px] leading-relaxed lowercase">
                    {description}
                </p>
            </div>
            {button && (
                <Button variant="primary" onClick={button.onClick}>
                    {button.icon && button.icon}
                    {button.label}
                </Button>
            )}
        </Card>
    );
};

export default EmptyStateCard;
