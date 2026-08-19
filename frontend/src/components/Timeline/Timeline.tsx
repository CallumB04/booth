import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TimelineProps {
    className?: string;
    children: ReactNode;
}

// Vertical activity feed, each entry draws its own connecting rule
const Timeline = ({ className, children }: TimelineProps) => {
    return (
        <div className={twMerge("flex flex-col", className)}>{children}</div>
    );
};

export default Timeline;
