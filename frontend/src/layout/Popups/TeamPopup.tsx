import Popup from "../../components/Popup/Popup";
import type { Team } from "../../api/teams";
import { customAppColorToTeamIconClasses } from "../../util/teams";
import Button from "../../components/Button/Button";
import Navigator from "../../components/Navigator/Navigator";
import { PlusIcon } from "lucide-react";
import { BUTTON_ICON_SIZE } from "../../constants/icons";

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
        >
            {/* View Navigator and Buttons */}
            <span className="flex w-140 max-w-full justify-between gap-2">
                <Navigator
                    options={[
                        { label: "Overview" },
                        { label: "Members" },
                        { label: "Settings" },
                    ]}
                />
                <Button variant="primary">
                    <PlusIcon size={BUTTON_ICON_SIZE} />
                    Add Member
                </Button>
            </span>
        </Popup>
    );
};

export default TeamPopup;
