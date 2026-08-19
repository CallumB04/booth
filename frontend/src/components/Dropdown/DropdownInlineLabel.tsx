import { twMerge } from "tailwind-merge";

interface DropdownInlineLabelProps {
    className?: string;
    text: string;
}

// Mono key rendered inside a dropdown's trigger, e.g. the "team" in "team all".
// An alternative to InputLabel for filters, where a label above every control
// would take more room than the controls themselves.
const DropdownInlineLabel = ({ className, text }: DropdownInlineLabelProps) => {
    return (
        <span
            className={twMerge(
                "text-text-disabled shrink-0 font-mono lowercase",
                className
            )}
        >
            {text}
        </span>
    );
};

export default DropdownInlineLabel;
