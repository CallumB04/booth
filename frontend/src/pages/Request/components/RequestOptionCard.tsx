import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import MonoLabel from "../../../components/Text/MonoLabel";
import type { RequestOption } from "../requestOptions";

interface RequestOptionCardProps {
    className?: string;
    option: RequestOption;
    children: ReactNode; // the preview for this route
    onOpen?: () => void;
}

// One route into booth: what it is, a preview of the interface, and the way in.
// The whole card is the target - the button inside it is the affordance, not a
// second thing to click.
const RequestOptionCard = ({
    className,
    option,
    children,
    onOpen,
}: RequestOptionCardProps) => {
    const { recommended } = option;

    return (
        <Card
            className={twMerge(
                "group w-full gap-0 overflow-hidden p-0",
                recommended &&
                    "border-highlight/34 hover:border-highlight/50 ring-highlight/8 ring-3",
                className
            )}
            onClick={onOpen}
        >
            {/* What this route is for */}
            <div className="flex flex-col gap-3 p-5 pb-0">
                <div className="flex items-center gap-2.5">
                    <span
                        className={twMerge(
                            "flex size-8 shrink-0 items-center justify-center rounded-lg",
                            recommended
                                ? "bg-highlight/10 text-highlight"
                                : "bg-surface-hover text-text-secondary"
                        )}
                    >
                        {option.icon}
                    </span>
                    <MonoLabel
                        className={twMerge(
                            "text-[9.5px]",
                            recommended && "text-highlight-soft"
                        )}
                    >
                        {option.tag}
                    </MonoLabel>
                </div>
                <div className="space-y-1.5">
                    <h3 className="text-text-display text-[18px] font-normal tracking-[-0.02em] lowercase">
                        {option.title}
                    </h3>
                    <p className="text-text-secondary text-[12.5px] leading-relaxed lowercase">
                        {option.description}
                    </p>
                </div>
            </div>

            {/* A look at the interface this opens */}
            <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-5 pt-4 pb-0">
                <MonoLabel className="text-[9px]">
                    {option.previewLabel}
                </MonoLabel>
                {children}
            </div>

            {/* How long it takes, and the way in */}
            <div className="flex flex-col gap-3 p-5">
                <span className="text-text-tertiary font-mono text-[9.5px] lowercase">
                    {option.duration}
                </span>
                {/* The click belongs to the card, so the button takes its
                    hover from the card rather than from itself */}
                <Button
                    variant={recommended ? "primary" : "secondary"}
                    className={twMerge(
                        "pointer-events-none w-full",
                        recommended
                            ? "group-hover:bg-btn-primary-hover"
                            : "group-hover:border-input-border-hover group-hover:bg-surface-hover"
                    )}
                >
                    {option.action}
                </Button>
            </div>
        </Card>
    );
};

export default RequestOptionCard;
