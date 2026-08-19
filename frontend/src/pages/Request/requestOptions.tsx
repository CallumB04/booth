import { FileTextIcon, MessagesSquareIcon, ZapIcon } from "lucide-react";
import type { ReactNode } from "react";

export type RequestMode = "quick" | "chat" | "transcript";

export type RequestOption = {
    mode: RequestMode;
    tag: string; // mono line beside the icon, what this route is best at
    title: string;
    description: string;
    previewLabel: string; // heading above the preview
    duration: string; // roughly how long this route takes
    action: string; // label on the card's button
    recommended?: boolean; // the route booth suggests reaching for first
    icon: ReactNode;
};

// The three ways a request can reach booth. Each one opens its own interface.
export const REQUEST_OPTIONS: RequestOption[] = [
    {
        mode: "quick",
        tag: "fastest",
        title: "quick request",
        description:
            "One message. Describe it the way you'd say it in Slack and booth splits it into tickets.",
        previewLabel: "preview",
        duration: "~20 seconds",
        action: "start typing",
        recommended: true,
        icon: <ZapIcon size={17} />,
    },
    {
        mode: "chat",
        tag: "for big scopes",
        title: "talk it through",
        description:
            "A back-and-forth. Booth asks about scope, owners and sequencing before it writes anything.",
        previewLabel: "preview",
        duration: "3-5 minutes",
        action: "open a conversation",
        icon: <MessagesSquareIcon size={17} />,
    },
    {
        mode: "transcript",
        tag: "from a meeting",
        title: "ingest a transcript",
        description:
            "Drop in a call. Booth pulls out only the decisions and actions, and ignores the rest.",
        previewLabel: "three ways in",
        duration: "~1 minute",
        action: "add a transcript",
        icon: <FileTextIcon size={17} />,
    },
];
