import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SectionProps {
    className?: string;
    contentClassName?: string; // div containing the section contents
    children: ReactNode;
    label: string;
}

const Section = ({
    className,
    contentClassName,
    children,
    label,
}: SectionProps) => {
    return (
        <section className={twMerge("space-y-4", className)}>
            {/* Section header, hairline runs out to the edge */}
            <div className="flex items-center gap-3">
                <h2 className="text-text-tertiary font-mono text-[10px] tracking-[0.11em] uppercase">
                    {label}
                </h2>
                <div className="bg-layout-border h-px flex-1" />
            </div>
            {/* Section contents, underneath header and hairline */}
            <div className={twMerge("space-y-4", contentClassName)}>
                {children}
            </div>
        </section>
    );
};

export default Section;
