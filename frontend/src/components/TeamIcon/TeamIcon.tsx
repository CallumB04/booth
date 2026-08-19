import { twMerge } from "tailwind-merge";
import type { Team } from "../../api/teams";
import { customAppColorToTeamIconClasses } from "../../util/teams";

type TeamIconSize = "default" | "lg";

interface TeamIconProps {
    className?: string;
    team: Team;
    size?: TeamIconSize;
}

const getSizeClasses = (size: TeamIconSize) => {
    switch (size) {
        case "default":
            return "size-9 rounded-lg text-[11px]";
        case "lg":
            return "size-10 rounded-lg text-[12.5px]";
    }
};

// A team's first two letters on its own colour, the same everywhere a team appears
const TeamIcon = ({ className, team, size = "default" }: TeamIconProps) => {
    return (
        <span
            className={twMerge(
                "flex shrink-0 items-center justify-center border font-mono uppercase select-none",
                getSizeClasses(size),
                customAppColorToTeamIconClasses(team.color),
                className
            )}
        >
            {team.name.slice(0, 2)}
        </span>
    );
};

export default TeamIcon;
