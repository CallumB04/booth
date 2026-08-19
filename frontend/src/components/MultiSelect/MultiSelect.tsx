import { useRef, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import InputLabel from "../Text/InputLabel";
import Popout from "../Popout/Popout";
import useClickOutside from "../../hooks/useClickOutside";

export type MultiSelectOption = {
    label: string;
    value: string;
    description?: string; // optional secondary line (e.g. "free · 8 users")
    icon?: ReactNode; // optional leading element (e.g. avatar / logo / icon)
};

interface MultiSelectProps {
    className?: string; // classes for the trigger button
    containerClassName?: string; // div containing label and multi select
    menuClassName?: string; // classes for the open options menu
    options: MultiSelectOption[];
    label?: string;
    placeholder?: string;
    defaultValues?: string[]; // initially selected values, placeholder shown if empty
    disabled?: boolean;
    onChange?: (values: string[]) => void;
}

const MultiSelect = ({
    className,
    containerClassName,
    menuClassName,
    options,
    label,
    placeholder,
    defaultValues,
    disabled,
    onChange,
}: MultiSelectProps) => {
    const [currentValues, setCurrentValues] = useState<string[]>(
        defaultValues ?? []
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectedOptions = options.filter((o) =>
        currentValues.includes(o.value)
    );

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => setIsOpen(false)); // close when click outside

    const handleToggle = (option: MultiSelectOption) => {
        const newValues = currentValues.includes(option.value)
            ? currentValues.filter((v) => v !== option.value)
            : [...currentValues, option.value];

        setCurrentValues(newValues);

        // send new values to parent component
        if (onChange) {
            onChange(newValues);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <div ref={containerRef} className="relative w-full">
                {/* Multi select element */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={twMerge(
                        "input-default flex w-full cursor-pointer items-center gap-2.5 p-2 text-left disabled:cursor-not-allowed",
                        className
                    )}
                >
                    <span
                        className={twMerge(
                            "min-w-0 flex-1 truncate font-sans",
                            selectedOptions.length === 0 && "text-text-disabled"
                        )}
                    >
                        {selectedOptions.length === 0
                            ? (placeholder ?? "Choose options...")
                            : selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    {/* Count of selected options */}
                    {selectedOptions.length > 0 && (
                        <span className="bg-highlight/14 text-highlight-soft shrink-0 rounded-[5px] px-1.5 py-0.5 font-mono text-[10px]">
                            {selectedOptions.length}
                        </span>
                    )}
                    <ChevronDownIcon
                        size={16}
                        className={twMerge(
                            "text-text-secondary shrink-0 transition-transform",
                            isOpen && "rotate-180"
                        )}
                    />
                </button>

                {/* Options menu */}
                {isOpen && !disabled && (
                    <Popout
                        xPos="right"
                        yPos="bottom"
                        title={label}
                        className={twMerge(
                            "flex max-h-100 w-full flex-col overflow-y-auto",
                            menuClassName
                        )}
                    >
                        {options.map((o) => {
                            const isSelected = currentValues.includes(o.value);

                            return (
                                <button
                                    key={o.value}
                                    type="button"
                                    onClick={() => handleToggle(o)}
                                    className={twMerge(
                                        "text-text-secondary hover:bg-surface-hover hover:text-text-primary flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors",
                                        isSelected && "text-text-primary"
                                    )}
                                >
                                    {o.icon}
                                    <span className="flex min-w-0 flex-1 flex-col">
                                        <span className="truncate font-sans">
                                            {o.label}
                                        </span>
                                        {o.description && (
                                            <span className="text-text-disabled truncate text-[11px] tracking-normal">
                                                {o.description}
                                            </span>
                                        )}
                                    </span>
                                    {isSelected && (
                                        <CheckIcon
                                            size={15}
                                            className="text-highlight shrink-0"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </Popout>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;
