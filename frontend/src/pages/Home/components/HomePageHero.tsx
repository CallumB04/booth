import { SparklesIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Button from "../../../components/Button/Button";

interface HomePageHeroProps {
    className?: string;
}

const HomePageHero = ({ className }: HomePageHeroProps) => {
    return (
        <div
            className={twMerge(
                "relative grid grid-cols-1 items-center gap-12 pt-20 pb-16 lg:grid-cols-[1fr_minmax(0,440px)] lg:pt-24 lg:pb-20",
                className
            )}
        >
            {/* Left column — text content */}
            <div className="space-y-6">
                <span className="border-layout-border bg-surface text-text-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
                    <span className="text-highlight">◆</span>
                    beta
                </span>
                <h1 className="text-text-primary text-4xl font-medium text-balance sm:text-5xl lg:text-6xl">
                    the AI-powered ticket system for cross-functional teams.
                </h1>
                <p className="text-text-secondary max-w-2xl text-lg">
                    organsations with cross-functional teams are always asking
                    your engineers for things in their own way. booth translates
                    their non-technical requests into technical solutions -
                    creating structured tickets, and assigning them to the
                    correct people.
                </p>
                <span className="flex flex-wrap items-center gap-3 pt-2">
                    <Button variant="primary" className="h-14 px-7 text-sm">
                        Start for free
                    </Button>
                    <a href="#pricing">
                        <Button
                            variant="secondary"
                            className="h-14 px-7 text-sm"
                        >
                            See pricing
                        </Button>
                    </a>
                </span>
                <p className="text-text-tertiary font-mono text-xs">
                    free for the first 10 users · no credit card needed
                </p>
            </div>

            {/* Right column — demo card (desktop only) */}
            <div className="hidden lg:block">
                <div className="border-layout-border bg-surface flex flex-col overflow-hidden rounded-lg border shadow-xl">
                    {/* Window-chrome style header */}
                    <div className="border-b-layout-border bg-surface-muted flex items-center justify-between gap-2 border-b px-4 py-2.5">
                        <div className="flex items-center gap-2">
                            <span className="bg-highlight size-1.5 rounded-full" />
                            <span className="text-text-secondary font-mono text-[10px] tracking-widest uppercase">
                                new request
                            </span>
                        </div>
                    </div>

                    {/* INPUT section — chat-bubble style */}
                    <div className="flex flex-col gap-2.5 px-5 py-4">
                        <div className="text-text-disabled font-mono text-[10px] tracking-widest uppercase">
                            input
                        </div>
                        <div className="flex items-start gap-2.5">
                            <div className="bg-highlight/15 text-highlight border-highlight/20 flex size-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium">
                                CB
                            </div>
                            <div className="bg-surface-muted text-text-primary flex-1 rounded-md rounded-tl-none px-3 py-2 text-[13px] leading-relaxed">
                                the dashboard is broken on mobile and the export
                                is slow with big datasets
                            </div>
                        </div>
                    </div>

                    {/* AI processing indicator — sits in the middle as a clear connector */}
                    <div className="border-y-layout-border bg-background relative flex items-center justify-center gap-2 border-y py-2.5">
                        <SparklesIcon
                            size={11}
                            className="text-highlight animate-pulse"
                        />
                        <span className="text-text-secondary font-mono text-[10px] tracking-widest uppercase">
                            Smart Inbox · 2 tickets created
                        </span>
                    </div>

                    {/* OUTPUT section — structured tickets with different categories */}
                    <div className="flex flex-col gap-2 px-5 py-4">
                        <div className="text-text-disabled font-mono text-[10px] tracking-widest uppercase">
                            output
                        </div>
                        <div className="border-layout-border bg-background hover:border-highlight/40 flex items-center gap-2.5 rounded-md border px-3 py-2 transition-colors">
                            <span className="bg-danger/15 text-danger rounded px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                                bug
                            </span>
                            <span className="text-text-primary flex-1 truncate text-[12px]">
                                mobile dashboard layout broken
                            </span>
                            <span className="text-text-tertiary font-mono text-[10px]">
                                @callum
                            </span>
                        </div>
                        <div className="border-layout-border bg-background hover:border-highlight/40 flex items-center gap-2.5 rounded-md border px-3 py-2 transition-colors">
                            <span className="bg-highlight/15 text-highlight rounded px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                                perf
                            </span>
                            <span className="text-text-primary flex-1 truncate text-[12px]">
                                slow export on large datasets
                            </span>
                            <span className="text-text-tertiary font-mono text-[10px]">
                                @kacper
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageHero;
