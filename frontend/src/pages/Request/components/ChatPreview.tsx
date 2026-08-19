import { twMerge } from "tailwind-merge";

interface ChatPreviewProps {
    className?: string;
}

// The person asking has no technical vocabulary and shouldn't need one -
// booth does the translating, in plain language
const MESSAGES: { from: "you" | "booth"; text: string }[] = [
    { from: "you", text: "we want signing up to be easier for customers" },
    { from: "booth", text: "the emails they get too, or just the screens?" },
    { from: "you", text: "both, and people keep saying login is broken" },
];

// Staggered so the dots ripple rather than pulse together
const TYPING_DELAYS = ["0ms", "160ms", "320ms"];

const ChatPreview = ({ className }: ChatPreviewProps) => {
    return (
        <div
            className={twMerge(
                "border-input-border bg-background flex min-h-0 flex-1 flex-col gap-2 rounded-[9px] border p-3",
                className
            )}
        >
            {MESSAGES.map((message) => {
                const fromYou = message.from === "you";

                return (
                    <div
                        key={message.text}
                        className={twMerge(
                            "max-w-[88%] px-2.5 py-1.5",
                            fromYou
                                ? "bg-surface-hover text-text-primary self-end rounded-xl rounded-br-[4px]"
                                : "bg-highlight/10 text-highlight-soft self-start rounded-xl rounded-bl-[4px]"
                        )}
                    >
                        <p className="text-[11.5px] leading-snug lowercase">
                            {message.text}
                        </p>
                    </div>
                );
            })}

            {/* Booth working on what it just heard */}
            <div className="mt-auto flex items-center gap-2 pt-1.5">
                <span className="flex items-center gap-1">
                    {TYPING_DELAYS.map((delay) => (
                        <span
                            key={delay}
                            className="bg-highlight animate-agent-glow size-[5px] rounded-full"
                            style={{ animationDelay: delay }}
                        />
                    ))}
                </span>
                <span className="text-text-tertiary font-mono text-[9.5px] lowercase">
                    drafting 7 tickets
                </span>
            </div>
        </div>
    );
};

export default ChatPreview;
