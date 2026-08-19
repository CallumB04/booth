import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronsUpDownIcon } from "lucide-react";
import Popout from "../../../components/Popout/Popout";
import useClickOutside from "../../../hooks/useClickOutside";
import { useOrganisation } from "../../../contexts/OrganisationContext";
import OrganisationDropdownIcon from "./OrganisationDropdownIcon";

interface SidebarOrganisationProps {
    className?: string;
}

// Org switcher pinned to the top of the rail. There is always an active
// organisation once the list has loaded - the context falls back to the first.
const SidebarOrganisation = ({ className }: SidebarOrganisationProps) => {
    const { organisations, activeOrganisation, setActiveOrganisation } =
        useOrganisation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef, () => setIsOpen(false)); // close when click outside

    return (
        <div
            ref={containerRef}
            className={twMerge(
                "border-b-layout-border h-topbar-height relative shrink-0 border-b px-3",
                className
            )}
        >
            <button
                type="button"
                disabled={!activeOrganisation}
                onClick={() => setIsOpen((prev) => !prev)}
                className="hover:bg-surface-hover flex h-full w-full cursor-pointer items-center gap-2.5 rounded-md px-1.5 text-left transition-colors disabled:cursor-default disabled:hover:bg-transparent"
            >
                {activeOrganisation ? (
                    <>
                        <OrganisationDropdownIcon
                            name={activeOrganisation.name}
                        />
                        <span className="flex min-w-0 flex-1 flex-col leading-tight">
                            <span className="text-text-primary truncate text-[12.5px]">
                                {activeOrganisation.name}
                            </span>
                            <span className="text-text-disabled truncate font-mono text-[9.5px] lowercase">
                                {`free · ${activeOrganisation.member_count} ${
                                    activeOrganisation.member_count === 1
                                        ? "seat"
                                        : "seats"
                                }`}
                            </span>
                        </span>
                        <ChevronsUpDownIcon
                            size={12}
                            className="text-text-disabled shrink-0"
                        />
                    </>
                ) : (
                    // Placeholder while the organisations are still loading
                    <>
                        <span className="bg-surface-hover size-6.5 shrink-0 rounded-md" />
                        <span className="bg-surface-hover h-2.5 w-24 rounded" />
                    </>
                )}
            </button>

            {/* Organisation list */}
            {isOpen && organisations.length >= 1 && (
                <Popout
                    xPos="right"
                    yPos="bottom"
                    title="organisations"
                    className="left-3 w-[calc(var(--sidebar-width)-24px)]"
                >
                    {organisations.map((o) => (
                        <button
                            key={o.id}
                            type="button"
                            onClick={() => {
                                setActiveOrganisation(o);
                                setIsOpen(false);
                            }}
                            className={twMerge(
                                "text-text-secondary hover:bg-surface-hover hover:text-text-primary flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-[12.5px] transition-colors",
                                o.id === activeOrganisation?.id &&
                                    "text-text-primary"
                            )}
                        >
                            <OrganisationDropdownIcon name={o.name} />
                            <span className="flex min-w-0 flex-1 flex-col">
                                <span className="truncate">{o.name}</span>
                                <span className="text-text-disabled truncate font-mono text-[9.5px]">
                                    {o.member_count}{" "}
                                    {o.member_count === 1 ? "user" : "users"}
                                </span>
                            </span>
                        </button>
                    ))}
                </Popout>
            )}
        </div>
    );
};

export default SidebarOrganisation;
