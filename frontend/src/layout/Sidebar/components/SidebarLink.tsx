import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface SidebarLinkProps {
    className?: string;
    text: string;
    icon: ReactNode;
    to: string;
    trailing?: ReactNode; // count or badge pinned to the right
    open?: boolean; // is this the current open page?
}

const SidebarLink = ({
    className,
    text,
    icon,
    to,
    trailing,
    open,
}: SidebarLinkProps) => {
    return (
        <Link
            to={to}
            className={twMerge(
                "group flex h-7.75 w-full items-center gap-2.5 rounded-md px-2.5 transition-colors",
                open ? "bg-highlight/10" : "hover:bg-surface-hover",
                className
            )}
        >
            <span
                className={twMerge(
                    "shrink-0 transition-colors",
                    open
                        ? "text-highlight"
                        : "text-text-tertiary group-hover:text-text-primary"
                )}
            >
                {icon}
            </span>
            <p
                className={twMerge(
                    "truncate text-[12.5px] lowercase transition-colors",
                    open
                        ? "text-highlight"
                        : "text-text-secondary group-hover:text-text-primary"
                )}
            >
                {text}
            </p>
            {trailing && <span className="ml-auto shrink-0">{trailing}</span>}
        </Link>
    );
};

export default SidebarLink;
