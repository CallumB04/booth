import {
    ChartNoAxesColumnIcon,
    InboxIcon,
    LayoutDashboardIcon,
    LibraryBigIcon,
    ListIcon,
    SettingsIcon,
    UsersIcon,
    KanbanIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export const NAV_ICON_SIZE = 16;

export type NavLink = {
    label: string;
    to: string;
    icon: ReactNode;
    // Badge in the rail. "attention" is for counts aimed at you personally,
    // "total" for a plain tally. Static until the counts are wired up.
    count?: number;
    countVariant?: "attention" | "total";
};

export type NavGroup = {
    label: string; // also the breadcrumb root for every link inside it
    links: NavLink[];
};

// Single source of truth for the sidebar, the breadcrumb and the command palette
export const NAV_GROUPS: NavGroup[] = [
    {
        label: "Workspace",
        links: [
            {
                label: "Dashboard",
                to: "/dashboard",
                icon: <LayoutDashboardIcon size={NAV_ICON_SIZE} />,
            },
            {
                label: "Tickets",
                to: "/tickets",
                icon: <KanbanIcon size={NAV_ICON_SIZE} />,
                count: 0,
                countVariant: "total",
            },
            {
                label: "My queue",
                to: "/my-queue",
                icon: <ListIcon size={NAV_ICON_SIZE} />,
                count: 0,
                countVariant: "attention",
            },
            {
                label: "Inbox",
                to: "/inbox",
                icon: <InboxIcon size={NAV_ICON_SIZE} />,
                count: 0,
                countVariant: "attention",
            },
        ],
    },
    {
        label: "Intelligence",
        links: [
            {
                label: "Insights",
                to: "/insights",
                icon: <ChartNoAxesColumnIcon size={NAV_ICON_SIZE} />,
            },
            {
                label: "Knowledge",
                to: "/knowledge",
                icon: <LibraryBigIcon size={NAV_ICON_SIZE} />,
            },
        ],
    },
    {
        label: "Organisation",
        links: [
            {
                label: "Teams",
                to: "/teams",
                icon: <UsersIcon size={NAV_ICON_SIZE} />,
            },
            {
                label: "Settings",
                to: "/settings",
                icon: <SettingsIcon size={NAV_ICON_SIZE} />,
            },
        ],
    },
];

// Pages reachable without a sidebar entry, still need a breadcrumb
const EXTRA_CRUMBS: Record<string, [string, string]> = {
    "/request": ["Workspace", "New request"],
    "/design": ["Organisation", "Design library"],
};

// Breadcrumb pair for a path, falling back to the first link in the nav
export const getBreadcrumb = (pathname: string): [string, string] => {
    for (const group of NAV_GROUPS) {
        const link = group.links.find((l) => pathname.startsWith(l.to));
        if (link) return [group.label, link.label];
    }

    const extra = Object.entries(EXTRA_CRUMBS).find(([path]) =>
        pathname.startsWith(path)
    );
    if (extra) return extra[1];

    return [NAV_GROUPS[0].label, NAV_GROUPS[0].links[0].label];
};
