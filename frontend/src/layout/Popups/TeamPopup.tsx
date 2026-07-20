import Popup from "../../components/Popup/Popup";
import type { Team } from "../../api/teams";
import { customAppColorToTeamIconClasses } from "../../util/teams";

interface TeamPopupProps {
    team: Team;
    closePopup: () => void;
}

const TeamPopup = ({ team, closePopup }: TeamPopupProps) => {
    return (
        <Popup
            title={team.name}
            description={team.description}
            headerIcon={{
                icon: (
                    <p className="text-xl font-medium">
                        {team.name.slice(0, 2)}
                    </p>
                ),
                bgClassName: customAppColorToTeamIconClasses(team.color),
            }}
            capitalizeHeader
            closePopup={closePopup}
        ></Popup>
    );
};

export default TeamPopup;
