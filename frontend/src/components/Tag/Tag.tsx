import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import type { CustomAppColor } from "../../constants/colors";

interface TagProps {
    className?: string;
    children: ReactNode;
    color: CustomAppColor;
}

// Written out in full, tailwind only picks up literal class names
const colorClasses: Record<CustomAppColor, string> = {
    blue: "bg-app-blue/13 text-app-blue",
    green: "bg-app-green/13 text-app-green",
    purple: "bg-app-purple/13 text-app-purple",
    cyan: "bg-app-cyan/13 text-app-cyan",
    orange: "bg-app-orange/13 text-app-orange",
    slate: "bg-app-slate/13 text-app-slate",
    red: "bg-app-red/13 text-app-red",
    pink: "bg-app-pink/13 text-app-pink",
    amber: "bg-app-amber/13 text-app-amber",
    teal: "bg-app-teal/13 text-app-teal",
    violet: "bg-app-violet/13 text-app-violet",
    sky: "bg-app-sky/13 text-app-sky",
};

// Generic label in any of the custom app colors
const Tag = ({ className, children, color }: TagProps) => {
    return (
        <div
            className={twMerge(
                "flex h-6 w-max items-center gap-1.5 rounded-[5px] px-2.5 font-mono text-[10px] lowercase",
                colorClasses[color],
                className
            )}
        >
            {children}
        </div>
    );
};

export default Tag;
