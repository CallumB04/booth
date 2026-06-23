import {
    BrainIcon,
    DatabaseIcon,
    GithubIcon,
    LayersIcon,
    MessagesSquareIcon,
    SparklesIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Card from "../../../components/Card/Card";
import HomePageSectionLabel from "./HomePageSectionLabel";

interface HomePageAIGridProps {
    className?: string;
}

interface AICapability {
    icon: ReactNode;
    title: string;
    description: string;
}

const capabilities: AICapability[] = [
    {
        icon: <SparklesIcon size={20} className="text-highlight" />,
        title: "simple request",
        description:
            "write a quick message or paste a paragraph. booth extracts any numbers of tickets, then sorts and assigns them to the correct people.",
    },
    {
        icon: <MessagesSquareIcon size={20} className="text-highlight" />,
        title: "chat mode",
        description:
            "for complex or messier requests, the chat interface goes back and forth until everything's clear. then writes the tickets in one go.",
    },
    {
        icon: <LayersIcon size={20} className="text-highlight" />,
        title: "transcript ingestion",
        description:
            "drop in a granola, notion or pasted meeting transcript. booth extracts the action items as structured tickets, sorting and assigning as normal.",
    },
    {
        icon: <BrainIcon size={20} className="text-highlight" />,
        title: "smart inbox",
        description:
            "every new ticket gets categorised, prioritised and assigned. uncertain calls go to an approval queue rather than getting assigned wrong.",
    },
    {
        icon: <DatabaseIcon size={20} className="text-highlight" />,
        title: "knowledge base",
        description:
            "every conversation, ticket and integration becomes searchable context. the AI uses it to write better tickets and assign more accurately over time.",
    },
    {
        icon: <GithubIcon size={20} className="text-highlight" />,
        title: "github-aware",
        description:
            "booth knows your repos. it can suggest where in the codebase a fix might live, link tickets to the right files, and sync with github issues both directions.",
    },
];

const HomePageAIGrid = ({ className }: HomePageAIGridProps) => {
    return (
        <div className={twMerge("space-y-10 px-4 py-24", className)}>
            <HomePageSectionLabel label="ai" />
            <div className="max-w-3xl space-y-3">
                <h2 className="text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                    an AI that actually knows{" "}
                    <span className="text-highlight">your company</span>
                </h2>
                <p className="text-text-secondary text-lg">
                    every ticket, every conversation, and every external
                    resource you import becomes part of your company's context.
                    booth uses it to improve sorting, write better tickets and
                    assign them to the right people
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {capabilities.map((cap) => (
                    <Card key={cap.title} className="w-full">
                        <div className="flex flex-col gap-3">
                            {cap.icon}
                            <h3 className="text-text-primary text-lg font-medium">
                                {cap.title}
                            </h3>
                            <p className="text-text-secondary text-sm">
                                {cap.description}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomePageAIGrid;
