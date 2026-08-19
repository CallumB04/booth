import { twMerge } from "tailwind-merge";
import type { NavigatorOption } from "./Navigator";

interface NavigatorItemProps {
    option: NavigatorOption;
    active?: boolean;
    onClick?: () => void;
}

const NavigatorItem = ({ option, active, onClick }: NavigatorItemProps) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                "text-text-tertiary hover:text-text-primary flex h-full cursor-pointer items-center rounded-[5px] px-3 font-mono text-[11px] whitespace-nowrap transition-colors select-none",
                active &&
                    "bg-text-primary text-background hover:text-background"
            )}
        >
            {option.label}
        </div>
    );
};

export default NavigatorItem;
