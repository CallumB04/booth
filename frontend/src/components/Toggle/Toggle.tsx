import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ToggleProps {
    className?: string; // classes for the track
    containerClassName?: string; // label containing track and text
    label?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
}

const Toggle = ({
    className,
    containerClassName,
    label,
    defaultChecked,
    disabled,
    onChange,
}: ToggleProps) => {
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
                role="switch"
                className="sr-only"
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
            />
            {/* Track */}
            <span
                className={twMerge(
                    "flex h-5 w-9 shrink-0 items-center rounded-full border p-0.5 transition-all",
                    checked
                        ? "bg-highlight border-highlight"
                        : "border-input-border bg-surface-hover",
                    disabled &&
                        (checked
                            ? "bg-btn-primary-disabled border-btn-primary-disabled"
                            : "border-btn-secondary-disabled-border bg-btn-secondary-disabled-bg"),
                    className
                )}
            >
                {/* Knob */}
                <span
                    className={twMerge(
                        "size-3.5 rounded-full bg-white transition-transform",
                        checked && "translate-x-4",
                        disabled && "bg-text-disabled"
                    )}
                />
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

export default Toggle;
