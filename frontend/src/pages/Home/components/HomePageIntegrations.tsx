import {
    BookOpenIcon,
    MessagesSquareIcon,
    SquareKanbanIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import HomePageSectionLabel from "./HomePageSectionLabel";

interface HomePageIntegrationsProps {
    className?: string;
}

interface IntegrationGroup {
    icon: ReactNode;
    label: string;
    tools: string[];
    description: string;
    tag: string;
}

const groups: IntegrationGroup[] = [
    {
        icon: <MessagesSquareIcon size={20} />,
        label: "chat tools",
        tools: ["slack", "teams", "discord"],
        description:
            "DM the booth bot or @mention it in any channel. it'll create the request right there and drop the tickets straight in your inbox.",
        tag: "create requests",
    },
    {
        icon: <BookOpenIcon size={20} />,
        label: "meetings & docs",
        tools: ["granola", "notion"],
        description:
            "pull meeting transcripts and import documentation. booth extracts action items as tickets and uses the rest as searchable knowledge.",
        tag: "knowledge base",
    },
    {
        icon: <SquareKanbanIcon size={20} />,
        label: "task management",
        tools: ["github", "jira"],
        description:
            "two-way import and export for teams that already rely on another source of truth.",
        tag: "import & export",
    },
];

const HomePageIntegrations = ({ className }: HomePageIntegrationsProps) => {
    return (
        <div className={twMerge("space-y-10 px-4 py-24", className)}>
            <HomePageSectionLabel label="integrations" />
            <div className="max-w-3xl space-y-3">
                <h2 className="text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                    fits inside the tools your team already uses.
                </h2>
                <p className="text-text-secondary text-lg">
                    create requests from external chat tools, pull notes from
                    your meetings, and sync the resulting tickets to wherever
                    your team tracks work.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {groups.map((group) => (
                    <div
                        key={group.label}
                        className="border-layout-border bg-surface hover:border-highlight flex flex-col gap-4 rounded-md border p-5 transition-colors"
                    >
                        {/* Header — icon + category label + tag */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <div className="bg-highlight/10 text-highlight flex size-10 shrink-0 items-center justify-center rounded-md">
                                    {group.icon}
                                </div>
                                <span className="text-text-primary text-sm font-medium">
                                    {group.label}
                                </span>
                            </div>
                            <span className="text-text-tertiary border-layout-border rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase">
                                {group.tag}
                            </span>
                        </div>

                        {/* Tools as chips */}
                        <div className="flex flex-wrap gap-1.5">
                            {group.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="bg-surface-muted text-text-secondary border-layout-border rounded border px-2 py-1 font-mono text-[11px]"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary text-sm leading-relaxed">
                            {group.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePageIntegrations;
