import { useState } from "react";
import { twMerge } from "tailwind-merge";
import SideNavItem from "./SideNavItem";

export type SideNavOption = {
    label: string;
    count?: number;
    onClick?: () => void;
};

interface SideNavProps {
    className?: string;
    options: SideNavOption[];
    defaultOptionLabel?: string;
    onChange?: (option: SideNavOption) => void;
}

// Vertical tab column, used down the side of Knowledge and Settings
const SideNav = ({
    className,
    options,
    defaultOptionLabel,
    onChange,
}: SideNavProps) => {
    const [activeLabel, setActiveLabel] = useState<string>(
        defaultOptionLabel ?? options[0]?.label
    );

    const handleOptionClick = (option: SideNavOption) => {
        setActiveLabel(option.label);
        if (option.onClick) option.onClick();
        if (onChange) onChange(option);
    };

    return (
        <div className={twMerge("flex w-full flex-col gap-0.5", className)}>
            {options.map((o) => (
                <SideNavItem
                    key={o.label}
                    option={o}
                    active={o.label === activeLabel}
                    onClick={() => handleOptionClick(o)}
                />
            ))}
        </div>
    );
};

export default SideNav;
