import { twMerge } from "tailwind-merge";
import Button from "../../../components/Button/Button";

interface HomePageCTAProps {
    className?: string;
}

const HomePageCTA = ({ className }: HomePageCTAProps) => {
    return (
        <div
            className={twMerge(
                "home-cta-dots bg-surface-muted relative left-1/2 w-screen -translate-x-1/2 px-4 py-32",
                className
            )}
        >
            {/* Fade dots out behind the central content for readability */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 70% at 50% 50%, var(--surface-muted-color) 30%, transparent 80%)",
                }}
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
                <h2 className="text-text-primary max-w-120 text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                    stop translating. start building.
                </h2>
                <p className="text-text-primary/80 text-lg">
                    your engineers spend hours every week trying to decypher
                    what other teams actually need. booth handles that part for
                    them, so they can spend their time on building.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <Button variant="primary" className="h-14 px-7 text-sm">
                        Start for free
                    </Button>
                    <Button variant="secondary" className="h-14 px-7 text-sm">
                        Book a demo
                    </Button>
                </div>
                <div className="text-text-tertiary pt-2 font-mono text-xs">
                    free for the first 10 users · no credit card needed
                </div>
            </div>
        </div>
    );
};

export default HomePageCTA;
