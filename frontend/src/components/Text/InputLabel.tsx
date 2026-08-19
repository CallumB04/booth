import { twMerge } from "tailwind-merge";

interface InputLabelProps {
    className?: string;
    text: string;
}

const InputLabel = ({ className, text }: InputLabelProps) => {
    return (
        <p
            className={twMerge(
                "text-text-tertiary font-mono text-[10px] tracking-[0.11em] uppercase",
                className
            )}
        >
            {text}
        </p>
    );
};

export default InputLabel;
