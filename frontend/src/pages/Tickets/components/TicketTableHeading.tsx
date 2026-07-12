import { twMerge } from "tailwind-merge";

interface TicketTableHeadingProps {
    className?: string;
    text: string;
}

const TicketTableHeading = ({ className, text }: TicketTableHeadingProps) => {
    return (
        <p
            className={twMerge(
                "text-text-disabled text-[10px] font-medium tracking-wider uppercase",
                className
            )}
        >
            {text}
        </p>
    );
};

export default TicketTableHeading;
