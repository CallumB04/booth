import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ClickableTextProps {
    className?: string;
    children: ReactNode;
    onClick: () => void;
}

const ClickableText = ({
    className,
    children,
    onClick,
}: ClickableTextProps) => {
    return (
        <div
            className={twMerge(
                "text-highlight-bright hover:text-highlight-soft w-max cursor-pointer text-[13px] font-medium transition-colors",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default ClickableText;
