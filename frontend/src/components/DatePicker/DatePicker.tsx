import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "lucide-react";
import InputLabel from "../Text/InputLabel";
import Popout from "../Popout/Popout";
import useClickOutside from "../../hooks/useClickOutside";

interface DatePickerProps {
    className?: string; // classes for the trigger button
    containerClassName?: string; // div containing label and date picker
    menuClassName?: string; // classes for the open calendar
    label?: string;
    inlineLabel?: string; // mono key inside the trigger, as on Dropdown
    placeholder?: string;
    value?: Date; // controlled - takes over from the internal selection when set
    defaultValue?: Date; // initially selected date, placeholder shown if empty
    disabled?: boolean;
    onChange?: (value: Date) => void;
}

// Weeks run Monday to Sunday
const WEEKDAYS = ["m", "t", "w", "t", "f", "s", "s"];

const startOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, months: number) =>
    new Date(date.getFullYear(), date.getMonth() + months, 1);

const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

// Days of the month, padded with nulls so the first day lands on its weekday
const buildMonth = (month: Date) => {
    const daysInMonth = new Date(
        month.getFullYear(),
        month.getMonth() + 1,
        0
    ).getDate();

    // getDay() is Sunday first, shift it so Monday leads
    const leading = (startOfMonth(month).getDay() + 6) % 7;

    return [
        ...Array.from({ length: leading }, () => null),
        ...Array.from(
            { length: daysInMonth },
            (_, day) => new Date(month.getFullYear(), month.getMonth(), day + 1)
        ),
    ];
};

const DatePicker = ({
    className,
    containerClassName,
    menuClassName,
    label,
    inlineLabel,
    placeholder,
    value,
    defaultValue,
    disabled,
    onChange,
}: DatePickerProps) => {
    const [internalValue, setInternalValue] = useState<Date | undefined>(
        defaultValue
    );

    // Controlled when a value is passed, otherwise it keeps its own
    const currentValue = value ?? internalValue;
    const [month, setMonth] = useState<Date>(
        startOfMonth(defaultValue ?? new Date())
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const today = new Date();

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => setIsOpen(false)); // close when click outside

    const handleSelect = (date: Date) => {
        setInternalValue(date);
        setIsOpen(false);

        // send new value to parent component
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <div ref={containerRef} className="relative w-full">
                {/* Date picker element */}
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={twMerge(
                        "input-default flex w-full cursor-pointer items-center gap-2.5 p-2 text-left tabular-nums disabled:cursor-not-allowed",
                        className
                    )}
                >
                    {inlineLabel && (
                        <span className="text-text-disabled shrink-0 font-mono text-[11px] lowercase">
                            {inlineLabel}
                        </span>
                    )}
                    <span
                        className={twMerge(
                            "min-w-0 flex-1 truncate font-sans",
                            !currentValue && "text-text-disabled"
                        )}
                    >
                        {currentValue
                            ? formatDate(currentValue)
                            : (placeholder ?? "Choose a date...")}
                    </span>
                    <CalendarIcon
                        size={16}
                        className="text-text-secondary shrink-0"
                    />
                </button>

                {/* Calendar */}
                {isOpen && !disabled && (
                    <Popout
                        xPos="right"
                        yPos="bottom"
                        title={label ?? inlineLabel}
                        className={twMerge("w-72 p-3", menuClassName)}
                    >
                        {/* Month header */}
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setMonth(addMonths(month, -1))}
                                className="text-text-secondary hover:bg-surface-hover hover:text-text-primary flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
                            >
                                <ChevronLeftIcon size={16} />
                            </button>
                            <span className="text-text-primary text-[13px] font-semibold">
                                {month.toLocaleDateString("en-GB", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                            <button
                                type="button"
                                onClick={() => setMonth(addMonths(month, 1))}
                                className="text-text-secondary hover:bg-surface-hover hover:text-text-primary flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
                            >
                                <ChevronRightIcon size={16} />
                            </button>
                        </div>
                        {/* Weekday headings */}
                        <div className="mt-2 grid grid-cols-7">
                            {WEEKDAYS.map((weekday, index) => (
                                <span
                                    key={index}
                                    className="text-text-disabled flex h-6 items-center justify-center font-mono text-[10px] tracking-[0.04em] lowercase"
                                >
                                    {weekday}
                                </span>
                            ))}
                        </div>
                        {/* Days */}
                        <div className="grid grid-cols-7 gap-y-0.5">
                            {buildMonth(month).map((date, index) =>
                                date ? (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSelect(date)}
                                        className={twMerge(
                                            "text-text-primary hover:bg-surface-hover flex h-8 cursor-pointer items-center justify-center rounded-lg text-[12.5px] tabular-nums transition-colors",
                                            isSameDay(date, today) &&
                                                "text-highlight-bright",
                                            currentValue &&
                                                isSameDay(date, currentValue) &&
                                                "bg-highlight text-highlight-on hover:bg-highlight-hover font-semibold"
                                        )}
                                    >
                                        {date.getDate()}
                                    </button>
                                ) : (
                                    <span key={index} />
                                )
                            )}
                        </div>
                    </Popout>
                )}
            </div>
        </div>
    );
};

export default DatePicker;
