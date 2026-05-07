import {
    ArrowRightIcon,
    GithubIcon,
    NotebookTextIcon,
    PlusIcon,
    SlackIcon,
    SparklesIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import Card from "../../../components/Card/Card";
import HomePageSectionLabel from "./HomePageSectionLabel";

interface HomePageProductFeaturesProps {
    className?: string;
}

const HomePageProductFeatures = ({
    className,
}: HomePageProductFeaturesProps) => {
    return (
        <div className={twMerge("space-y-10 px-4 py-24", className)}>
            <HomePageSectionLabel label="product" />
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl space-y-3">
                    <h2 className="text-text-primary text-3xl font-medium tracking-tight sm:text-4xl">
                        what booth actually does
                    </h2>
                    <p className="text-text-secondary text-lg">
                        helps translate non-technical requests into
                        straight-forward technical solutions
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card
                    variant="muted"
                    title="any way they want to ask"
                    description="a paragraph, a meeting transcript, a message to the booth bot, or a back and forth chat. all of them turn into structured tickets."
                    className="w-full"
                >
                    <div className="border-layout-border bg-surface mt-4 flex flex-col gap-3 rounded-md border p-4">
                        <div className="border-layout-border bg-background text-text-secondary border-l-2 border-l-transparent px-3 py-2 font-mono text-xs italic">
                            "the dashboard is broken on mobile and the export is
                            slow with big datasets"
                        </div>
                        <div className="text-text-tertiary flex items-center justify-center gap-1 font-mono text-[10px] tracking-widest uppercase">
                            <ArrowRightIcon size={12} /> 2 tickets
                        </div>
                    </div>
                </Card>

                <Card
                    variant="muted"
                    title="the smart inbox does the assigning"
                    description="every new ticket gets categorised, prioritised, and assigned to whoever can pick it up. when booth isn't sure, it queues for approval rather than guessing."
                    className="w-full"
                >
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="border-layout-border bg-surface flex items-center justify-between gap-2 rounded-md border px-3 py-2">
                            <span className="bg-danger/15 text-danger rounded px-2 py-0.5 font-mono text-[10px] uppercase">
                                bug
                            </span>
                            <span className="text-text-tertiary font-mono text-[11px]">
                                @callum
                            </span>
                        </div>
                        <div className="border-layout-border bg-surface flex items-center justify-between gap-2 rounded-md border px-3 py-2">
                            <span className="bg-highlight/15 text-highlight rounded px-2 py-0.5 font-mono text-[10px] uppercase">
                                feature
                            </span>
                            <span className="text-text-tertiary font-mono text-[11px]">
                                @kacper
                            </span>
                        </div>
                        <div className="border-highlight bg-surface flex items-center justify-between gap-2 rounded-md border px-3 py-2">
                            <span className="border-highlight text-highlight rounded border px-2 py-0.5 font-mono text-[10px] uppercase">
                                needs review
                            </span>
                            <span className="text-text-tertiary font-mono text-[11px]">
                                unassigned
                            </span>
                        </div>
                    </div>
                </Card>

                <Card
                    variant="muted"
                    title="fits the tools you already use"
                    description="supports many integrations with tools you are comfortable with. includes imports and exports, knowledge base embedding, external booth bots for requests, etc."
                    className="w-full"
                >
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="border-layout-border bg-surface flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                            <span className="flex items-center gap-2">
                                <GithubIcon
                                    size={14}
                                    className="text-highlight"
                                />
                                <span className="text-text-secondary font-mono text-xs">
                                    github
                                </span>
                            </span>
                            <span className="text-text-tertiary flex items-center gap-1 font-mono text-[10px] uppercase">
                                import + export
                            </span>
                        </div>
                        <div className="border-layout-border bg-surface flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                            <span className="flex items-center gap-2">
                                <NotebookTextIcon
                                    size={14}
                                    className="text-highlight"
                                />
                                <span className="text-text-secondary font-mono text-xs">
                                    notion
                                </span>
                            </span>
                            <span className="text-text-tertiary font-mono text-[10px] uppercase">
                                knowledge base
                            </span>
                        </div>
                        <div className="border-layout-border bg-surface flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                            <span className="flex items-center gap-2">
                                <SlackIcon
                                    size={14}
                                    className="text-highlight"
                                />
                                <span className="text-text-secondary font-mono text-xs">
                                    slack
                                </span>
                            </span>
                            <span className="text-text-tertiary font-mono text-[10px] uppercase">
                                bot for requests
                            </span>
                        </div>
                        <div className="border-layout-border/50 flex items-center justify-center gap-1.5 rounded-md border border-dashed py-2">
                            <PlusIcon
                                size={11}
                                className="text-text-tertiary"
                            />
                            <span className="text-text-tertiary font-mono text-[10px] tracking-widest uppercase">
                                and more
                            </span>
                        </div>
                    </div>
                </Card>
                <Card
                    variant="muted"
                    title="gets smarter the more you use it"
                    description="booth understands your team's patterns, who handles what, how you write tickets, what priority means to you. assignments and suggestions perfect over time as booth learns."
                    className="w-full"
                >
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="border-layout-border bg-surface flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                            <span className="text-text-secondary font-mono text-[11px]">
                                mobile bug → @callum
                            </span>
                            <span className="text-text-tertiary flex items-center gap-1 font-mono text-[10px]">
                                <SparklesIcon
                                    size={10}
                                    className="text-highlight"
                                />{" "}
                                assigned
                            </span>
                        </div>
                        <div className="border-layout-border bg-surface flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                            <span className="text-text-secondary font-mono text-[11px]">
                                billing issue → @kacper
                            </span>
                            <span className="text-text-tertiary flex items-center gap-1 font-mono text-[10px]">
                                <SparklesIcon
                                    size={10}
                                    className="text-highlight"
                                />{" "}
                                assigned
                            </span>
                        </div>
                        <div className="border-layout-border bg-surface flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                            <span className="text-text-secondary font-mono text-[11px]">
                                api docs → @kat
                            </span>
                            <span className="text-text-tertiary flex items-center gap-1 font-mono text-[10px]">
                                <SparklesIcon
                                    size={10}
                                    className="text-highlight"
                                />{" "}
                                assigned
                            </span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default HomePageProductFeatures;
