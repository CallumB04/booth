import { useRef, useState, type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { PaperclipIcon, PlusIcon, XIcon } from "lucide-react";
import InputLabel from "../Text/InputLabel";

interface FileUploadProps {
    className?: string; // div containing the file cards
    containerClassName?: string; // div containing label and file cards
    label?: string;
    max?: number;
    accept?: string;
    disabled?: boolean;
    onChange?: (files: File[]) => void;
}

// Attachment slots, e.g. screenshots added to a ticket
const FileUpload = ({
    className,
    containerClassName,
    label,
    max = 3,
    accept,
    disabled,
    onChange,
}: FileUploadProps) => {
    const [files, setFiles] = useState<File[]>([]);

    const pickerRef = useRef<HTMLInputElement>(null);

    const updateFiles = (newFiles: File[]) => {
        setFiles(newFiles);

        // send new files to parent component
        if (onChange) {
            onChange(newFiles);
        }
    };

    const handlePick = (event: ChangeEvent<HTMLInputElement>) => {
        const picked = [...(event.target.files ?? [])];
        updateFiles([...files, ...picked].slice(0, max));

        // lets the same file be picked again after it's removed
        event.target.value = "";
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <div className={twMerge("flex flex-wrap gap-3", className)}>
                {/* Uploaded files */}
                {files.map((file, index) => (
                    <div
                        key={file.name}
                        className="border-surface-border bg-surface-raised flex size-24 flex-col justify-between rounded-xl border p-2.5"
                    >
                        <span className="flex items-start justify-between gap-2">
                            <PaperclipIcon
                                size={15}
                                className="text-text-secondary shrink-0"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    updateFiles(
                                        files.filter((_, at) => at !== index)
                                    )
                                }
                                className="text-text-disabled hover:text-text-primary cursor-pointer transition-colors"
                            >
                                <XIcon size={14} />
                            </button>
                        </span>
                        <span className="text-text-secondary truncate font-mono text-[10px] tracking-[0.04em] lowercase">
                            {file.name}
                        </span>
                    </div>
                ))}
                {/* Add file card, opens the OS file dialog */}
                {files.length < max && (
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => pickerRef.current?.click()}
                        className="border-input-border text-text-secondary hover:border-input-border-hover hover:bg-surface-hover hover:text-text-primary flex size-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed transition-colors disabled:cursor-not-allowed"
                    >
                        <PlusIcon size={16} />
                        <span className="font-mono text-[10px] tracking-[0.04em] lowercase">
                            add
                        </span>
                    </button>
                )}
                {/* Hidden file picker, triggered by the card above */}
                <input
                    ref={pickerRef}
                    type="file"
                    accept={accept}
                    multiple
                    hidden
                    onChange={handlePick}
                />
            </div>
        </div>
    );
};

export default FileUpload;
