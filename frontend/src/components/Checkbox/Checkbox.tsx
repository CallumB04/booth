import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { CheckIcon } from "lucide-react";

interface CheckboxProps {
    className?: string; // classes for the box itself
    containerClassName?: string; // label containing box and text
    label?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
}

const Checkbox = ({
    className,
    containerClassName,
    label,
    defaultChecked,
    disabled,
    onChange,
}: CheckboxProps) => {
    const [checked, setChecked] = useState<boolean>(defaultChecked ?? false);

    const handleChange = () => {
        const newValue = !checked;
        setChecked(newValue);

        // send new value to parent component
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <label
            className={twMerge(
                "relative flex w-max items-center gap-2.5 select-none",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                containerClassName
            )}
        >
            {/* Hidden native input, keeps the control keyboard accessible */}
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
            />
            <span
                className={twMerge(
                    "flex size-4 shrink-0 items-center justify-center rounded-[5px] border transition-all",
                    checked
                        ? "bg-highlight border-highlight text-highlight-on"
                        : "border-input-border bg-surface-raised",
                    !disabled && !checked && "hover:border-input-border-hover",
                    disabled &&
                        (checked
                            ? "bg-btn-primary-disabled border-btn-primary-disabled text-btn-primary-disabled-text"
                            : "border-btn-secondary-disabled-border bg-btn-secondary-disabled-bg"),
                    className
                )}
            >
                {checked && <CheckIcon size={11} strokeWidth={3.4} />}
            </span>
            {label && (
                <span
                    className={twMerge(
                        "text-[13px]",
                        disabled ? "text-text-disabled" : "text-text-primary"
                    )}
                >
                    {label}
                </span>
            )}
        </label>
    );
};

export default Checkbox;
