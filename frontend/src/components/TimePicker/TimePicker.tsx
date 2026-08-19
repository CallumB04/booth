import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ClockIcon } from "lucide-react";
import InputLabel from "../Text/InputLabel";
import Popout from "../Popout/Popout";
import useClickOutside from "../../hooks/useClickOutside";

interface TimePickerProps {
    className?: string; // classes for the trigger button
    containerClassName?: string; // div containing label and time picker
    menuClassName?: string; // classes for the open options menu
    label?: string;
    placeholder?: string;
    defaultValue?: string; // initially selected time, 24 hour "HH:MM"
    stepMinutes?: number; // gap between the options offered
    disabled?: boolean;
    onChange?: (value: string) => void;
}

// Every time of day at the given step, as 24 hour "HH:MM"
const buildTimes = (stepMinutes: number) => {
    const count = Math.floor((24 * 60) / stepMinutes);

    return Array.from({ length: count }, (_, index) => {
        const minutes = index * stepMinutes;
        const hours = Math.floor(minutes / 60);

        return `${String(hours).padStart(2, "0")}:${String(
            minutes % 60
        ).padStart(2, "0")}`;
    });
};

const TimePicker = ({
    className,
    containerClassName,
    menuClassName,
    label,
    placeholder,
    defaultValue,
    stepMinutes = 15,
    disabled,
    onChange,
}: TimePickerProps) => {
    const [currentValue, setCurrentValue] = useState<string>(
        defaultValue ?? ""
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => setIsOpen(false)); // close when click outside

    const handleSelect = (time: string) => {
        setCurrentValue(time);
        setIsOpen(false);

        // send new value to parent component
        if (onChange) {
            onChange(time);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <div ref={containerRef} className="relative w-full">
                {/* Time picker element */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={twMerge(
                        "input-default flex w-full cursor-pointer items-center gap-2.5 p-2 text-left tabular-nums disabled:cursor-not-allowed",
                        className
                    )}
                >
                    <span
                        className={twMerge(
                            "min-w-0 flex-1 truncate font-sans",
                            !currentValue && "text-text-disabled"
                        )}
                    >
                        {currentValue || (placeholder ?? "Choose a time...")}
                    </span>
                    <ClockIcon
                        size={16}
                        className="text-text-secondary shrink-0"
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
                        {buildTimes(stepMinutes).map((time) => (
                            <button
                                key={time}
                                type="button"
                                onClick={() => handleSelect(time)}
                                className={twMerge(
                                    "text-text-secondary hover:bg-surface-hover hover:text-text-primary flex w-full cursor-pointer items-center px-3 py-2 text-left font-mono text-[12.5px] tabular-nums transition-colors",
                                    time === currentValue && "text-text-primary"
                                )}
                            >
                                {time}
                            </button>
                        ))}
                    </Popout>
                )}
            </div>
        </div>
    );
};

export default TimePicker;
