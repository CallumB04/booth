import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "accent"
    | "danger"
    | "secondary-transparent"
    | "danger-transparent";

export type ButtonSize = "default" | "sm" | "xs";

interface ButtonProps {
    className?: string;
    variant: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

const getSizeClasses = (size: ButtonSize) => {
    switch (size) {
        case "default":
            return "h-9.5 gap-2 rounded-[7px] px-3.5 text-[12.5px]";
        case "sm":
            return "h-7.5 gap-1.5 rounded-md px-3 text-[12px]";
        case "xs":
            return "h-6.5 gap-1.5 rounded-md px-2.5 font-mono text-[10.5px]";
    }
};

const Button = ({
    className,
    variant,
    size = "default",
    children,
    disabled,
    onClick,
}: ButtonProps) => {
    return (
        <button
            className={twMerge(
                "flex w-max items-center justify-center border border-transparent font-sans transition-colors",
                getSizeClasses(size),
                // Flat solid accent, the one filled control on any screen
                variant === "primary" &&
                    (disabled
                        ? "bg-btn-primary-disabled text-btn-primary-disabled-text"
                        : "bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover font-medium"),
                // Quiet bordered default, used for everything alongside it
                variant === "secondary" &&
                    (disabled
                        ? "bg-btn-secondary-disabled-bg text-text-disabled border-btn-secondary-disabled-border"
                        : "bg-btn-secondary-bg border-input-border text-text-primary hover:border-input-border-hover hover:bg-surface-hover"),
                // Tinted accent, for agent actions that shouldn't shout
                variant === "accent" &&
                    (disabled
                        ? "bg-btn-primary-disabled text-btn-primary-disabled-text"
                        : "bg-highlight/10 border-highlight/26 text-highlight-soft hover:bg-highlight/16 font-semibold"),
                // Outlined danger, never filled
                variant === "danger" &&
                    (disabled
                        ? "bg-btn-secondary-disabled-bg text-text-disabled border-btn-secondary-disabled-border"
                        : "border-danger/28 text-danger hover:bg-danger/8"),
                variant === "secondary-transparent" &&
                    "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
                variant === "danger-transparent" &&
                    "text-danger/80 hover:text-danger hover:bg-danger/8",
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                className
            )}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
