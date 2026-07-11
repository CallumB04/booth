import { useRef, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import InputLabel from "../Text/InputLabel";
import Popout from "../Popout/Popout";
import useClickOutside from "../../hooks/useClickOutside";

export type DropdownOption = {
    label: string;
    value: string;
    description?: string; // optional secondary line (e.g. "free · 8 users")
    icon?: ReactNode; // optional leading element (e.g. avatar / logo / icon)
};

interface DropdownProps {
    className?: string; // classes for the trigger button
    containerClassName?: string; // div containing label and dropdown
    menuClassName?: string; // classes for the open options menu
    options: DropdownOption[];
    label?: string;
    placeholder?: string;
    defaultValue?: string; // initially selected value, placeholder shown if empty
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const Dropdown = ({
    className,
    containerClassName,
    menuClassName,
    options,
    label,
    placeholder,
    defaultValue,
    disabled,
    onChange,
}: DropdownProps) => {
    const [currentValue, setCurrentValue] = useState<string>(
        defaultValue ?? ""
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectedOption = options.find((o) => o.value === currentValue);

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => setIsOpen(false)); // close when click outside

    const handleSelect = (option: DropdownOption) => {
        setCurrentValue(option.value);
        setIsOpen(false);

        // send new value to parent component
        if (onChange) {
            onChange(option.value);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <div ref={containerRef} className="relative w-full">
                {/* Dropdown Element */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={twMerge(
                        "input-default flex w-full cursor-pointer items-center gap-2.5 p-2 text-left disabled:cursor-not-allowed",
                        selectedOption?.description && "h-auto! py-1.5",
                        className
                    )}
                >
                    {selectedOption?.icon}
                    <span className="flex min-w-0 flex-1 flex-col">
                        <span
                            className={twMerge(
                                "truncate font-sans",
                                !selectedOption && "text-text-disabled"
                            )}
                        >
                            {selectedOption?.label ??
                                placeholder ??
                                "Choose an option..."}
                        </span>
                        {selectedOption?.description && (
                            <span className="text-text-disabled truncate text-[11px] tracking-normal">
                                {selectedOption.description}
                            </span>
                        )}
                    </span>
                    <ChevronRightIcon
                        size={16}
                        className={twMerge(
                            "text-text-secondary shrink-0 transition-transform",
                            isOpen && "rotate-90"
                        )}
                    />
                </button>

                {/* Options menu */}
                {isOpen && !disabled && (
                    <Popout
                        xPos="right"
                        yPos="bottom"
                        className={twMerge(
                            "flex max-h-64 w-full flex-col gap-0.5 overflow-y-auto rounded-md",
                            menuClassName
                        )}
                    >
                        {options.map((o) => {
                            const isSelected = o.value === currentValue;

                            return (
                                <button
                                    key={o.value}
                                    type="button"
                                    onClick={() => handleSelect(o)}
                                    className={twMerge(
                                        "text-text-secondary hover:bg-surface-muted hover:text-text-primary flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left font-mono text-[13px] tracking-wide transition-colors",
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

export default Dropdown;
