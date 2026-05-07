import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import useInView from "../../hooks/useInView";

interface AnimateInViewProps {
    className?: string;
    children: ReactNode;
    delay?: number; // ms
    as?: "div" | "section" | "span";
    id?: string;
}

const AnimateInView = ({
    className,
    children,
    delay,
    as = "div",
    id,
}: AnimateInViewProps) => {
    const [ref, isInView] = useInView<HTMLDivElement>();

    const Tag = as as "div";

    return (
        <Tag
            ref={ref}
            id={id}
            data-in-view={isInView ? "true" : "false"}
            className={twMerge(className)}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </Tag>
    );
};

export default AnimateInView;
