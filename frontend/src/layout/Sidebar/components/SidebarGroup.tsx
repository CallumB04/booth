import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarGroupProps {
    className?: string;
    title?: string;
    children: ReactNode;
}

const SidebarGroup = ({ className, title, children }: SidebarGroupProps) => {
    return (
        <div className={twMerge("flex w-full flex-col gap-px", className)}>
            {title && (
                <p className="text-text-disabled px-2.5 pb-2 font-mono text-[9.5px] tracking-[0.13em] uppercase">
                    {title}
                </p>
            )}
            {children}
        </div>
    );
};

export default SidebarGroup;
