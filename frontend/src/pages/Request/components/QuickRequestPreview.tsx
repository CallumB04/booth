import { twMerge } from "tailwind-merge";

interface QuickRequestPreviewProps {
    className?: string;
}

// A message part-way through being typed
const QuickRequestPreview = ({ className }: QuickRequestPreviewProps) => {
    return (
        <div
            className={twMerge(
                "border-input-border bg-background flex min-h-0 flex-1 flex-col gap-2.5 rounded-[9px] border p-3",
                className
            )}
        >
            <p className="text-text-primary text-[12px] leading-relaxed lowercase">
                gmail users aren't getting verification emails since tuesday,
                the invoice export is duplicating rows
                <span className="text-highlight">|</span>
            </p>
            <span className="bg-highlight text-highlight-on mt-auto ml-auto flex h-6 items-center rounded-md px-2.5 text-[11px] font-medium lowercase">
                send
            </span>
        </div>
    );
};

export default QuickRequestPreview;
