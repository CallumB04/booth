import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    BellIcon,
    MoonIcon,
    SearchIcon,
    SunIcon,
    TextAlignJustifyIcon,
    XIcon,
} from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Divider from "../../components/Divider/Divider";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import NotificationsPopout from "../Popouts/NotificationsPopout";
import UserProfilePopout from "../Popouts/UserProfilePopout";
import { useSidebar } from "../../contexts/SidebarContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useUser } from "../../contexts/UserContext";
import useClickOutside from "../../hooks/useClickOutside";
import { fetchNotifications } from "../../api/notifications";
import { getBreadcrumb } from "../../constants/navigation";

interface TopbarProps {
    className?: string;
    openSearch?: () => void;
}

const Topbar = ({ className, openSearch }: TopbarProps) => {
    const location = useLocation();
    const { user, userProfile } = useUser();
    const { theme, toggleTheme } = useTheme();
    const { isMobileSidebarOpen, toggleMobileSidebar } = useSidebar();

    const [crumbRoot, crumbLeaf] = getBreadcrumb(location.pathname);

    // User Profile Popout
    const [profilePopoutOpen, setProfilePopoutOpen] = useState<boolean>(false);
    const profilePopoutRef = useRef<HTMLDivElement>(null);
    useClickOutside(profilePopoutRef, () => setProfilePopoutOpen(false)); // close when click outside

    // Notifications Popout
    const [notificationsPopoutOpen, setNotificationsPopoutOpen] =
        useState<boolean>(false);

    // Load notifications on component mount
    const {
        data: notifications,
        isLoading: notificationsLoading,
        error: notificationsError,
    } = useQuery({
        queryKey: ["notifications", user?.id], // refetch when user changes
        queryFn: async () => {
            const notis = await fetchNotifications();
            return notis ?? [];
        },
        enabled: !!user?.id, // only fetch if logged in
    });

    const hasUnread = !!notifications?.some((n) => !n.read);

    return (
        <header
            className={twMerge(
                "border-b-layout-border bg-surface h-topbar-height flex shrink-0 items-center justify-between gap-4 border-b px-4 sm:px-5",
                className
            )}
        >
            <div className="flex min-w-0 items-center gap-1.5">
                {/* Hamburger Icon - Only visible on mobile - Opens Sidebar */}
                <button
                    type="button"
                    onClick={toggleMobileSidebar}
                    className="text-text-secondary hover:bg-surface-hover hover:text-text-primary -ml-1.5 flex size-8.5 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors lg:hidden"
                >
                    {isMobileSidebarOpen ? (
                        <XIcon size={19} />
                    ) : (
                        <TextAlignJustifyIcon size={19} />
                    )}
                </button>
                {/* Where you are */}
                <Breadcrumb root={crumbRoot} leaf={crumbLeaf} />
            </div>

            {/* Everything you can act on sits together on the right */}
            <div className="flex shrink-0 items-center gap-3">
                {/* Site search */}
                <button
                    type="button"
                    onClick={openSearch}
                    className="border-input-border bg-background hover:border-input-border-hover hidden h-8.5 cursor-pointer items-center gap-2.5 rounded-[7px] border pr-2.5 pl-3 transition-colors sm:flex sm:w-56"
                >
                    <SearchIcon
                        size={14}
                        className="text-text-disabled shrink-0"
                    />
                    <span className="text-text-disabled flex-1 truncate text-left font-mono text-[11px] lowercase">
                        search
                    </span>
                </button>

                <Divider direction="vertical" className="hidden sm:block" />

                {/* Light/Dark mode Icon */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="text-text-secondary hover:bg-surface-hover hover:text-text-primary flex size-8.5 cursor-pointer items-center justify-center rounded-lg transition-colors"
                >
                    {theme === "light" ? (
                        <SunIcon size={18} />
                    ) : (
                        <MoonIcon size={18} />
                    )}
                </button>

                {/* Notifications Icon - With Popout menu */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setNotificationsPopoutOpen(true)}
                        className="text-text-secondary hover:bg-surface-hover hover:text-text-primary relative flex size-8.5 cursor-pointer items-center justify-center rounded-lg transition-colors"
                    >
                        <BellIcon size={18} />
                        {/* Unread notifications marker */}
                        {hasUnread && (
                            <span className="bg-highlight ring-surface absolute top-1.5 right-1.5 size-1.5 rounded-full ring-2" />
                        )}
                    </button>
                    {notificationsPopoutOpen && (
                        <NotificationsPopout
                            notifications={notifications}
                            notificationsLoading={notificationsLoading}
                            notificationsError={notificationsError}
                            closePopout={() =>
                                setNotificationsPopoutOpen(false)
                            }
                        />
                    )}
                </div>

                {/* User Profile Icon - With Popout menu */}
                <div
                    className="relative flex items-center"
                    ref={profilePopoutRef}
                >
                    <UserAvatar
                        profile={userProfile}
                        size="lg"
                        onClick={() => setProfilePopoutOpen((prev) => !prev)}
                    />
                    {profilePopoutOpen && (
                        <UserProfilePopout
                            closePopout={() => setProfilePopoutOpen(false)}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;
