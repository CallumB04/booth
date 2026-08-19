import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import PageHeader from "./PageHeader";

interface PageProps {
    className?: string;
    children?: ReactNode;
    title?: ReactNode; // free-form so a title can hold a stored value at its own case
    navigation?: ReactNode; // tabs and filters, sit under the header on the left
    actions?: ReactNode; // the page's calls to action, on the right of the same row
}

// Padded page body, rendered inside the app shell's scroll area. Every page in
// the app shares this one column so they all line up with each other. The header
// only ever holds the title - navigation and actions go in the row beneath it.
const Page = ({
    className,
    children,
    title,
    navigation,
    actions,
}: PageProps) => {
    return (
        <div
            className={twMerge(
                "mx-auto w-full max-w-270 space-y-5 p-6 pb-14 sm:px-8 sm:pt-8",
                className
            )}
        >
            {/* Header */}
            {title && <PageHeader>{title}</PageHeader>}

            {/* Navigation on the left, calls to action on the right */}
            {(navigation || actions) && (
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                        {navigation}
                    </div>
                    {actions && (
                        <div className="flex shrink-0 items-center gap-2.5">
                            {actions}
                        </div>
                    )}
                </div>
            )}

            {children}
        </div>
    );
};

export default Page;
