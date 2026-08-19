import { twMerge } from "tailwind-merge";

interface FactChipProps {
    className?: string;
    label: string; // the mono key
    value: string;
}

// Inline key/value pill, used under an agent summary
const FactChip = ({ className, label, value }: FactChipProps) => {
    return (
        <div
            className={twMerge(
                "border-surface-border flex h-6.25 w-max items-center gap-2 rounded-md border px-2.5",
                className
            )}
        >
            <span className="text-text-disabled font-mono text-[10px] lowercase">
                {label}
            </span>
            <span className="text-text-secondary font-mono text-[10px] lowercase">
                {value}
            </span>
        </div>
    );
};

export default FactChip;
