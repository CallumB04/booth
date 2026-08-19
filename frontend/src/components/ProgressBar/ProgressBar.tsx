import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
    className?: string;
    barClassName?: string; // classes for the filled portion of the track
    targetValue: number;
    targetLabel?: string;
    currentValue: number;
    currentLabel?: string;
}

const ProgressBar = ({
    className,
    barClassName,
    targetValue,
    targetLabel,
    currentValue,
    currentLabel,
}: ProgressBarProps) => {
    const percent = Math.min((currentValue / targetValue) * 100, 100);

    return (
        <div className={twMerge("flex w-full flex-col gap-1.5", className)}>
            {/* Labels */}
            {(currentLabel || targetLabel) && (
                <div className="flex items-baseline justify-between gap-3">
                    <span className="text-text-secondary text-[12.5px]">
                        {currentLabel}
                    </span>
                    <span className="text-text-tertiary font-mono text-[10.5px] tabular-nums">
                        {targetLabel}
                    </span>
                </div>
            )}
            {/* Track */}
            <div className="bg-layout-border h-1.25 w-full overflow-hidden rounded-full">
                <div
                    className={twMerge(
                        "bg-highlight h-full rounded-full transition-all duration-300",
                        barClassName
                    )}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
