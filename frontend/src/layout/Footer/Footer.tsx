import { twMerge } from "tailwind-merge";
import AppLogo from "../../components/AppLogo/AppLogo";
import { useSidebar } from "../../contexts/SidebarContext";

interface FooterProps {
    className?: string;
}

const links = ["privacy", "terms", "contact"];

const Footer = ({ className }: FooterProps) => {
    // Auto-offsets to the right of the in-app sidebar when it's mounted —
    // the sidebar registers itself in context, so adding a new sidebar page
    // is just a matter of rendering <Sidebar />, no opt-in needed here.
    const { isSidebarMounted } = useSidebar();

    return (
        <footer
            className={twMerge(
                "border-t-layout-border bg-surface-muted border-t",
                isSidebarMounted && "lg:ml-sidebar-width",
                className
            )}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-3">
                    <AppLogo />
                    <p className="text-text-secondary max-w-xs text-sm">
                        translating non-technical requests into technical
                        solutions, for teams of every skill level.
                    </p>
                    <p className="text-text-tertiary mt-2 font-mono text-xs">
                        © 2026 booth
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {links.map((link, i) => (
                        <span key={link} className="flex items-center gap-x-5">
                            <a
                                href="#"
                                className="text-text-secondary hover:text-highlight font-mono text-xs tracking-wider transition-colors"
                            >
                                {link}
                            </a>
                            {i < links.length - 1 && (
                                <span className="text-text-disabled font-mono text-xs">
                                    ·
                                </span>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
