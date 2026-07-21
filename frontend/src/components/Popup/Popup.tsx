import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import PopupTitle from "./PopupTitle";
import PopupDescription from "./PopupDescription";
import { XIcon } from "lucide-react";

type PopupHeaderIcon = {
    icon: ReactNode;
    bgClassName: string;
};

interface PopupProps {
    className?: string;
    children?: ReactNode;
    title: string;
    description?: string;
    headerIcon?: PopupHeaderIcon; // goes before title and description
    capitalizeHeader?: boolean; // dont set title and description to lowercase
    preventClose?: boolean; // stop popup being closed by clicking outside or 'X' icon
    closePopup?: () => void;
}

const Popup = ({
    className,
    children,
    title,
    description,
    headerIcon,
    capitalizeHeader,
    preventClose,
    closePopup,
}: PopupProps) => {
    return (
        <dialog
            className="fixed top-0 left-0 z-99 flex h-screen w-screen items-center justify-center bg-black/60 p-4 sm:p-8"
            onMouseDown={() => {
                if (closePopup && !preventClose) closePopup();
            }}
        >
            <div
                className={twMerge(
                    "bg-surface flex max-w-full flex-col gap-5 rounded-2xl p-6 shadow-2xl",
                    className
                )}
                // prevent popup close if mouse is dragged and unclicks outside popup
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Popup Header */}
                <div className="flex w-full justify-between gap-8">
                    <span className="flex gap-4">
                        {/* Header Icon (optional) */}
                        {headerIcon && (
                            <div
                                className={twMerge(
                                    "bg-highlight/15 flex size-12 items-center justify-center rounded-lg",
                                    headerIcon.bgClassName
                                )}
                            >
                                {headerIcon.icon}
                            </div>
                        )}
                        {/* Title and Description */}
                        <span className="flex flex-col">
                            {/* Title */}
                            <PopupTitle capitalize={capitalizeHeader}>
                                {title}
                            </PopupTitle>
                            {/* Description (optional) */}
                            {description && (
                                <PopupDescription capitalize={capitalizeHeader}>
                                    {description}
                                </PopupDescription>
                            )}
                        </span>
                    </span>
                    {/* Close Popup Icon */}
                    {!preventClose && (
                        <button
                            className="text-text-disabled hover:text-text-primary mt-0.5 h-max shrink-0 cursor-pointer transition-colors"
                            onClick={closePopup}
                        >
                            <XIcon size={18} />
                        </button>
                    )}
                </div>
                {/* Popup Contents */}
                {children}
            </div>
        </dialog>
    );
};

export default Popup;
