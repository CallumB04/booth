import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import PageHeader from "./PageHeader";
import PageDescription from "./PageDescription";
import { useSidebar } from "../../contexts/SidebarContext";

interface PageProps {
    className?: string;
    children?: ReactNode;
    title?: string;
    description?: string;
}

const Page = ({ className, children, title, description }: PageProps) => {
    // Auto-offsets to the right of the in-app sidebar when it's mounted.
    const { isSidebarMounted } = useSidebar();

    return (
        <main
            className={twMerge(
                "mt-navbar-height flex min-h-[calc(100vh-var(--navbar-height))] justify-center p-4 sm:p-8",
                isSidebarMounted && "lg:ml-sidebar-width"
            )}
        >
            <div className={twMerge("w-full max-w-6xl space-y-6", className)}>
                {(title || description) && (
                    <div className="space-y-2">
                        {title && <PageHeader>{title}</PageHeader>}
                        {description && (
                            <PageDescription>{description}</PageDescription>
                        )}
                    </div>
                )}
                {children}
            </div>
        </main>
    );
};

export default Page;
