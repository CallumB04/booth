// Models

export type TicketStatus =
    | "resolved"
    | "in-progress"
    | "todo"
    | "unassigned"
    | "paused"
    | "cancelled";

export type TicketPriority = "low" | "medium" | "high";

// Every value of the above, for building filters and pickers
export const ALL_TICKET_STATUSES: TicketStatus[] = [
    "unassigned",
    "todo",
    "in-progress",
    "paused",
    "resolved",
    "cancelled",
];

// The statuses a ticket sits in while it is still someone's to do
export const ACTIVE_TICKET_STATUSES: TicketStatus[] = [
    "todo",
    "in-progress",
    "paused",
];

export const ALL_TICKET_PRIORITIES: TicketPriority[] = [
    "low",
    "medium",
    "high",
];

export type Ticket = {
    id: string;
    status: TicketStatus;
    priority: TicketPriority;
    title: string;
    description: string;
    created_at: string; // ISO string
};
