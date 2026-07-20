import { twMerge } from "tailwind-merge";
import type { Team } from "../../../api/teams";
import Card from "../../../components/Card/Card";
import { usePopup } from "../../../contexts/PopupContext";
import TeamPopup from "../../../layout/Popups/TeamPopup";
import { customAppColorToTeamIconClasses } from "../../../util/teams";

interface TeamsGridTeamProps {
    team: Team;
}

const TeamsGridTeam = ({ team }: TeamsGridTeamProps) => {
    const { pushPopup, popPopup } = usePopup();

    return (
        <Card
            key={team.id}
            className="w-full"
            onClick={() => {
                pushPopup(<TeamPopup team={team} closePopup={popPopup} />);
            }}
        >
            {/* Primary team details */}
            <div className="flex items-center gap-3">
                {/* Team Logo (first 2 characters) */}
                <p
                    className={twMerge(
                        "flex size-10 items-center justify-center rounded-lg text-lg font-medium",
                        customAppColorToTeamIconClasses(team.color)
                    )}
                >
                    {team.name.slice(0, 2)}
                </p>
                {/* Title and member count */}
                <div>
                    <p className="text-text-primary font-medium">{team.name}</p>
                    {/* TODO: replace this with real member count, pass from API in the DTO, integer member count value */}
                    <p className="text-text-disabled font-mono text-xs">
                        {team.member_count} members
                    </p>
                </div>
            </div>
            {/* Team Description */}
            <p className="text-text-secondary text-sm">{team.description}</p>
        </Card>
    );
};

export default TeamsGridTeam;
