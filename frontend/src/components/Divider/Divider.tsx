import { twMerge } from "tailwind-merge";

type DividerDirection = "horizontal" | "vertical";

interface DividerProps {
    className?: string;
    direction?: DividerDirection;
}

const Divider = ({ className, direction = "horizontal" }: DividerProps) => {
    return (
        <div
            className={twMerge(
                "bg-layout-border",
                direction === "horizontal" && "h-px w-full",
                direction === "vertical" && "h-5 w-px",
                className
            )}
        />
    );
};

export default Divider;
