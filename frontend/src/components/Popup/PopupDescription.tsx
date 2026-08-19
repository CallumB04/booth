import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PopupDescriptionProps {
    className?: string;
    capitalize?: boolean;
    children: ReactNode;
}

const PopupDescription = ({
    className,
    capitalize,
    children,
}: PopupDescriptionProps) => {
    return (
        <p
            className={twMerge(
                "text-text-tertiary text-[13px] leading-relaxed",
                !capitalize && "lowercase",
                className
            )}
        >
            {children}
        </p>
    );
};

export default PopupDescription;
