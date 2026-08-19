import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PlusIcon } from "lucide-react";
import SidebarGroup from "./components/SidebarGroup";
import SidebarLink from "./components/SidebarLink";
import SidebarOrganisation from "./components/SidebarOrganisation";
import Button from "../../components/Button/Button";
import CountBadge from "../../components/CountBadge/CountBadge";
import { useSidebar } from "../../contexts/SidebarContext";
import { NAV_GROUPS } from "../../constants/navigation";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isMobileSidebarOpen, closeMobileSidebar } = useSidebar();

    // close mobile sidebar if location changes
    useEffect(() => {
        closeMobileSidebar();
    }, [location.pathname]);

    return (
        <aside
            className={twMerge(
                "bg-rail border-r-layout-border w-sidebar-width fixed top-0 left-0 z-90 h-screen shrink-0 flex-col border-r lg:static lg:flex",
                isMobileSidebarOpen ? "flex" : "hidden",
                className
            )}
        >
            {/* Organisation switcher */}
            <SidebarOrganisation />

            {/* Primary action, the whole product starts here */}
            <div className="px-3 pt-3.5">
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => navigate("/request")}
                >
                    {/* Nudged left so the label reads as centred, rather than
                        the icon and label reading as a centred pair */}
                    <PlusIcon size={15} className="-ml-1.5" />
                    new request
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-4.5 overflow-y-auto p-3 pt-4">
                {NAV_GROUPS.map((group) => (
                    <SidebarGroup key={group.label} title={group.label}>
                        {group.links.map((link) => (
                            <SidebarLink
                                key={link.to}
                                text={link.label}
                                icon={link.icon}
                                to={link.to}
                                open={location.pathname.startsWith(link.to)}
                                trailing={
                                    link.count !== undefined && (
                                        <CountBadge
                                            variant={
                                                link.countVariant ===
                                                "attention"
                                                    ? "highlight"
                                                    : "neutral"
                                            }
                                        >
                                            {link.count}
                                        </CountBadge>
                                    )
                                }
                            />
                        ))}
                    </SidebarGroup>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
