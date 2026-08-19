import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "../Text/InputLabel";

interface CodeInputProps {
    className?: string; // classes for each box
    containerClassName?: string; // div containing label and boxes
    label?: string;
    length?: number;
    disabled?: boolean;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void; // fired once every box is filled
}

// One box per digit, used for email and SMS verification codes
const CodeInput = ({
    className,
    containerClassName,
    label,
    length = 6,
    disabled,
    onChange,
    onComplete,
}: CodeInputProps) => {
    const [digits, setDigits] = useState<string[]>(
        Array.from({ length }, () => "")
    );

    const boxRefs = useRef<(HTMLInputElement | null)[]>([]);

    const focusBox = (index: number) => {
        boxRefs.current[Math.min(Math.max(index, 0), length - 1)]?.focus();
    };

    const handleChange = (
        index: number,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const typed = event.target.value.replace(/\D/g, "");

        // pasting a whole code fills every box from this one on
        const newDigits = [...digits];
        if (typed) {
            typed.split("").forEach((digit, offset) => {
                if (index + offset < length) {
                    newDigits[index + offset] = digit;
                }
            });
            focusBox(index + typed.length);
        } else {
            newDigits[index] = "";
        }

        setDigits(newDigits);

        const newValue = newDigits.join("");

        // send new value to parent component
        if (onChange) {
            onChange(newValue);
        }

        if (onComplete && newValue.length === length) {
            onComplete(newValue);
        }
    };

    const handleKeyDown = (
        index: number,
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Backspace" && !digits[index]) {
            focusBox(index - 1);
        }

        if (event.key === "ArrowLeft") {
            focusBox(index - 1);
        }

        if (event.key === "ArrowRight") {
            focusBox(index + 1);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <div className="flex gap-2">
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        ref={(box) => {
                            boxRefs.current[index] = box;
                        }}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        disabled={disabled}
                        onChange={(event) => handleChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        className={twMerge(
                            "input-default h-13 w-11 px-0 text-center text-[20px] font-semibold tabular-nums",
                            className
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default CodeInput;
