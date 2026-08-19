import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageHeaderProps {
    className?: string;
    children: ReactNode;
}

const PageHeader = ({ className, children }: PageHeaderProps) => {
    return (
        <h1
            className={twMerge(
                "text-text-display text-[27px] leading-tight font-normal tracking-[-0.025em] lowercase",
                className
            )}
        >
            {children}
        </h1>
    );
};

export default PageHeader;
