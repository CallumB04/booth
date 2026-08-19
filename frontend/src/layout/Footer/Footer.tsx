import { twMerge } from "tailwind-merge";
import AppLogo from "../../components/AppLogo/AppLogo";

interface FooterProps {
    className?: string;
}

const links = ["privacy", "terms", "contact"];

// Only rendered on the public pages, the app shell has no footer
const Footer = ({ className }: FooterProps) => {
    return (
        <footer
            className={twMerge(
                "border-t-layout-border bg-rail border-t",
                className
            )}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-3">
                    <AppLogo />
                    <p className="text-text-secondary max-w-xs text-[13px] leading-relaxed">
                        translating non-technical requests into technical
                        solutions, for teams of every skill level.
                    </p>
                    <p className="text-text-disabled mt-2 font-mono text-[10.5px]">
                        © 2026 booth
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {links.map((link, i) => (
                        <span key={link} className="flex items-center gap-x-5">
                            <a
                                href="#"
                                className="text-text-secondary hover:text-highlight font-mono text-[11px] tracking-wider transition-colors"
                            >
                                {link}
                            </a>
                            {i < links.length - 1 && (
                                <span className="text-text-disabled font-mono text-[11px]">
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
