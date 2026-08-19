import { type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "../Text/InputLabel";

interface TextareaProps {
    className?: string;
    containerClassName?: string; // div containing label and textarea
    placeholder?: string;
    label?: string;
    defaultValue?: string;
    rows?: number;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const Textarea = ({
    className,
    containerClassName,
    placeholder,
    label,
    defaultValue,
    rows,
    disabled,
    onChange,
}: TextareaProps) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        // send new value to parent component
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <textarea
                placeholder={placeholder ?? "Type here..."}
                defaultValue={defaultValue}
                rows={rows ?? 4}
                disabled={disabled}
                onChange={handleChange}
                className={twMerge(
                    "input-default h-auto! w-full resize-y py-2.5 leading-relaxed",
                    className
                )}
            />
        </div>
    );
};

export default Textarea;
