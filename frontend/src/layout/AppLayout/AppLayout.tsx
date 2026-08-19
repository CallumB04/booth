import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import SearchPopup from "../../components/SearchPopup/SearchPopup";
import { NAV_GROUPS } from "../../constants/navigation";

interface AppLayoutProps {
    className?: string;
}

// Shell for every signed-in page: fixed rail on the left, topbar and scroll area
// on the right. The marketing pages render outside this and keep the Navbar.
const AppLayout = ({ className }: AppLayoutProps) => {
    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    return (
        <div
            className={twMerge(
                "bg-background flex h-screen w-full overflow-hidden",
                className
            )}
        >
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar openSearch={() => setSearchOpen(true)} />
                <main className="flex flex-1 flex-col overflow-y-auto">
                    <Outlet />
                </main>
            </div>
            {searchOpen && (
                <SearchPopup
                    groups={[
                        {
                            label: "Go to",
                            options: NAV_GROUPS.flatMap((group) =>
                                group.links.map((link) => ({
                                    label: link.label,
                                    value: link.to,
                                    meta: group.label.toLowerCase(),
                                }))
                            ),
                        },
                    ]}
                    onSelect={(option) => {
                        navigate(option.value);
                        setSearchOpen(false);
                    }}
                    closePopup={() => setSearchOpen(false)}
                />
            )}
        </div>
    );
};

export default AppLayout;
