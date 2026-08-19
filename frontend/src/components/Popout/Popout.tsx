import type { ReactNode, Ref } from "react";
import { twMerge } from "tailwind-merge";

type PopoutXPosition = "left" | "right";
type PopoutYPosition = "top" | "bottom";

// Menu surface. It carries no padding of its own, so rows, hairlines and
// anything else inside run the full width of the menu.
interface PopoutProps {
    className?: string;
    contentClassName?: string; // classes for content container when title is provided
    children: ReactNode;
    xPos: PopoutXPosition;
    yPos: PopoutYPosition;
    ref?: Ref<HTMLDivElement>;
    title?: string;
}

const Popout = ({
    className,
    contentClassName,
    children,
    xPos,
    yPos,
    ref,
    title,
}: PopoutProps) => {
    return (
        <div
            className={twMerge(
                "bg-surface-raised border-popup-border absolute z-90 w-max min-w-30 overflow-hidden rounded-[9px] border shadow-xl",
                xPos === "left" && "right-0",
                xPos === "right" && "left-0",
                yPos === "top" && "bottom-full mb-1.5",
                yPos === "bottom" && "top-full mt-1.5",
                className
            )}
            ref={ref}
        >
            {title && (
                <p className="border-b-layout-border text-text-disabled w-full border-b px-3 py-2.5 font-mono text-[9.5px] tracking-[0.11em] uppercase">
                    {title}
                </p>
            )}
            {title ? (
                <div
                    className={twMerge(
                        "flex min-h-0 flex-1 flex-col",
                        contentClassName
                    )}
                >
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default Popout;
