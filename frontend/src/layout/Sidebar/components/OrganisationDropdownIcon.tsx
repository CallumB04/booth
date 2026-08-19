interface OrganisationDropdownIconProps {
    name: string;
}

const OrganisationDropdownIcon = ({ name }: OrganisationDropdownIconProps) => {
    return (
        <span className="bg-highlight/14 text-highlight-soft flex size-6.5 shrink-0 items-center justify-center rounded-md font-mono text-[11px] uppercase select-none">
            {name.trim()[0] ?? "?"}
        </span>
    );
};

export default OrganisationDropdownIcon;
