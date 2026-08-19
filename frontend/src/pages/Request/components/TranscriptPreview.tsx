import { ClipboardIcon, LinkIcon, UploadIcon } from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TranscriptPreviewProps {
    className?: string;
}

type TranscriptSource = {
    label: string;
    icon: ReactNode;
    dashed?: boolean; // the drop target reads as a drop target
};

const SOURCES: TranscriptSource[] = [
    { label: "paste a link", icon: <LinkIcon size={14} /> },
    { label: "upload a file", icon: <UploadIcon size={14} />, dashed: true },
    { label: "paste the raw text", icon: <ClipboardIcon size={14} /> },
];

const TranscriptPreview = ({ className }: TranscriptPreviewProps) => {
    return (
        <div
            className={twMerge("flex min-h-0 flex-1 flex-col gap-2", className)}
        >
            {SOURCES.map((source) => (
                <div
                    key={source.label}
                    className={twMerge(
                        "border-input-border bg-background flex flex-1 items-center gap-2.5 rounded-[9px] border px-3 py-2.5",
                        source.dashed && "border-dashed"
                    )}
                >
                    <span className="text-text-secondary shrink-0">
                        {source.icon}
                    </span>
                    <span className="text-text-primary min-w-0 truncate text-[12px] lowercase">
                        {source.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default TranscriptPreview;
