import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PopupTitleProps {
    className?: string;
    capitalize?: boolean;
    children: ReactNode;
}

const PopupTitle = ({ className, capitalize, children }: PopupTitleProps) => {
    return (
        <h2
            className={twMerge(
                "text-text-primary text-[15.5px] font-semibold tracking-[-0.01em]",
                !capitalize && "lowercase",
                className
            )}
        >
            {children}
        </h2>
    );
};

export default PopupTitle;
