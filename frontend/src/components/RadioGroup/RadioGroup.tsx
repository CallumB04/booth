import { useState } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "../Text/InputLabel";

export type RadioOption = {
    label: string;
    value: string;
    description?: string; // optional secondary line under the label
};

interface RadioGroupProps {
    className?: string; // div containing the options
    containerClassName?: string; // div containing label and options
    options: RadioOption[];
    label?: string;
    defaultValue?: string; // initially selected value, none selected if empty
    boxed?: boolean; // draw each option as a selectable card
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const RadioGroup = ({
    className,
    containerClassName,
    options,
    label,
    defaultValue,
    boxed,
    disabled,
    onChange,
}: RadioGroupProps) => {
    const [currentValue, setCurrentValue] = useState<string>(
        defaultValue ?? ""
    );

    const handleSelect = (option: RadioOption) => {
        setCurrentValue(option.value);

        // send new value to parent component
        if (onChange) {
            onChange(option.value);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <div
                className={twMerge(
                    boxed ? "space-y-2" : "space-y-2.5",
                    className
                )}
            >
                {options.map((o) => {
                    const isSelected = o.value === currentValue;

                    return (
                        <label
                            key={o.value}
                            className={twMerge(
                                "relative flex items-start gap-2.5 select-none",
                                boxed
                                    ? "rounded-xl border p-3 transition-colors"
                                    : "w-max",
                                boxed &&
                                    (isSelected
                                        ? "border-highlight/26 bg-highlight/8"
                                        : "border-input-border bg-surface-muted hover:border-input-border-hover"),
                                disabled
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            )}
                        >
                            {/* Hidden native input, keeps the control keyboard accessible */}
                            <input
                                type="radio"
                                className="sr-only"
                                checked={isSelected}
                                disabled={disabled}
                                onChange={() => handleSelect(o)}
                            />
                            <span
                                className={twMerge(
                                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border transition-all",
                                    isSelected
                                        ? "border-highlight"
                                        : "border-input-border bg-surface-raised",
                                    !disabled &&
                                        !isSelected &&
                                        "hover:border-input-border-hover",
                                    disabled &&
                                        "border-btn-secondary-disabled-border bg-btn-secondary-disabled-bg"
                                )}
                            >
                                {/* Inner dot, only shown once selected */}
                                {isSelected && (
                                    <span
                                        className={twMerge(
                                            "size-2 rounded-full",
                                            disabled
                                                ? "bg-btn-primary-disabled-text"
                                                : "bg-highlight"
                                        )}
                                    />
                                )}
                            </span>
                            <span className="flex flex-col gap-0.5">
                                <span
                                    className={twMerge(
                                        "text-[13px] font-medium",
                                        disabled
                                            ? "text-text-disabled"
                                            : "text-text-primary"
                                    )}
                                >
                                    {o.label}
                                </span>
                                {o.description && (
                                    <span className="text-text-tertiary text-[12.5px] leading-relaxed">
                                        {o.description}
                                    </span>
                                )}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioGroup;
