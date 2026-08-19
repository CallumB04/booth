import { twMerge } from "tailwind-merge";

interface BreadcrumbProps {
    className?: string;
    root: string; // the nav group, e.g. "Workspace"
    leaf: string; // the current page
}

// Two-part trail shown at the left of the topbar
const Breadcrumb = ({ className, root, leaf }: BreadcrumbProps) => {
    return (
        <div
            className={twMerge("flex min-w-0 items-center gap-2.5", className)}
        >
            <span className="text-text-tertiary shrink-0 font-mono text-[11px] lowercase">
                {root}
            </span>
            <span className="text-text-faint text-[12px]">/</span>
            <span className="text-text-primary truncate text-[13.5px] font-medium tracking-[-0.005em]">
                {leaf}
            </span>
        </div>
    );
};

export default Breadcrumb;
