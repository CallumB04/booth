interface OrganisationDropdownIconProps {
    name: string;
}

const OrganisationDropdownIcon = ({ name }: OrganisationDropdownIconProps) => {
    return (
        <span className="bg-highlight/20 text-highlight flex size-7 shrink-0 items-center justify-center rounded-md text-[13px] font-semibold uppercase select-none">
            {name.trim()[0] ?? "?"}
        </span>
    );
};

export default OrganisationDropdownIcon;
