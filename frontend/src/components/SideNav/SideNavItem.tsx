import { twMerge } from "tailwind-merge";
import type { SideNavOption } from "./SideNav";

interface SideNavItemProps {
    option: SideNavOption;
    active?: boolean;
    onClick?: () => void;
}

const SideNavItem = ({ option, active, onClick }: SideNavItemProps) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                "text-text-secondary hover:bg-surface-hover hover:text-text-primary flex h-9.5 cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 text-[12.5px] transition-colors select-none",
                active &&
                    "bg-highlight/10 text-highlight-soft hover:bg-highlight/10 hover:text-highlight-soft"
            )}
        >
            <span className="truncate">{option.label}</span>
            {option.count !== undefined && (
                <span
                    className={twMerge(
                        "shrink-0 font-mono text-[10px] tabular-nums",
                        active ? "text-highlight-soft" : "text-text-disabled"
                    )}
                >
                    {option.count}
                </span>
            )}
        </div>
    );
};

export default SideNavItem;
