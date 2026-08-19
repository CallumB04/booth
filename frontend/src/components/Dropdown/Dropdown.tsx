import { useRef, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import InputLabel from "../Text/InputLabel";
import DropdownInlineLabel from "./DropdownInlineLabel";
import Popout from "../Popout/Popout";
import useClickOutside from "../../hooks/useClickOutside";

export type DropdownOption = {
    label: string;
    value: string;
    description?: string; // optional secondary line (e.g. "free · 8 users")
    icon?: ReactNode; // optional leading element (e.g. avatar / logo / icon)
};

type DropdownSize = "default" | "sm";

interface DropdownProps {
    className?: string; // classes for the trigger button
    containerClassName?: string; // div containing label and dropdown
    menuClassName?: string; // classes for the open options menu
    options: DropdownOption[];
    label?: string; // standard label, sits above the dropdown
    inlineLabel?: string; // mono key inside the trigger instead, for filters
    size?: DropdownSize;
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
    inlineLabel,
    size = "default",
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

    const isSmall = size === "sm";

    return (
        <div
            className={twMerge(
                "space-y-input-label",
                isSmall && "w-max space-y-0",
                containerClassName
            )}
        >
            {label && <InputLabel text={label} />}
            <div
                ref={containerRef}
                className={twMerge("relative w-full", isSmall && "w-max")}
            >
                {/* Dropdown Element */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={twMerge(
                        "flex cursor-pointer items-center text-left disabled:cursor-not-allowed",
                        // Compact filter build its own styling - layering it over
                        // input-default loses, since that class wins on specificity
                        isSmall
                            ? "border-input-border hover:border-input-border-hover bg-surface-raised text-text-primary h-9.5 w-max gap-1.5 rounded-[7px] border px-3 font-mono text-[11px] transition-colors"
                            : "input-default w-full gap-2 p-2",
                        !isSmall &&
                            selectedOption?.description &&
                            "h-auto! py-1.5",
                        className
                    )}
                >
                    {inlineLabel && (
                        <DropdownInlineLabel
                            className={
                                isSmall ? "text-[10.5px]" : "text-[11px]"
                            }
                            text={inlineLabel}
                        />
                    )}
                    {selectedOption?.icon}
                    <span
                        className={twMerge(
                            "flex min-w-0 flex-col",
                            isSmall ? "shrink-0" : "flex-1"
                        )}
                    >
                        <span
                            className={twMerge(
                                "truncate",
                                isSmall ? "lowercase" : "font-sans",
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
                    <ChevronDownIcon
                        size={isSmall ? 12 : 16}
                        className={twMerge(
                            "text-text-disabled shrink-0 transition-transform",
                            isOpen && "rotate-180"
                        )}
                    />
                </button>

                {/* Options menu */}
                {isOpen && !disabled && (
                    <Popout
                        xPos="right"
                        yPos="bottom"
                        title={label ?? inlineLabel}
                        className={twMerge(
                            "flex max-h-100 flex-col overflow-y-auto",
                            isSmall ? "min-w-40" : "w-full",
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

export default Dropdown;
