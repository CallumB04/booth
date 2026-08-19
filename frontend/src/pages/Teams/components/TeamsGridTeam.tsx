import { useRef, useState } from "react";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import type { Team } from "../../../api/teams";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import ClickableGroup from "../../../components/ClickableGroup/ClickableGroup";
import Popout from "../../../components/Popout/Popout";
import Divider from "../../../components/Divider/Divider";
import { usePopup } from "../../../contexts/PopupContext";
import TeamPopup from "../../../layout/Popups/TeamPopup";
import TeamIcon from "../../../components/TeamIcon/TeamIcon";
import useClickOutside from "../../../hooks/useClickOutside";

interface TeamsGridTeamProps {
    team: Team;
}

const TeamsGridTeam = ({ team }: TeamsGridTeamProps) => {
    const { pushPopup, popPopup } = usePopup();

    const [teamsPopoutOpen, setTeamsPopoutOpen] = useState<boolean>(false);
    const popoutRef = useRef<HTMLDivElement>(null);
    useClickOutside(popoutRef, () => setTeamsPopoutOpen(false));

    return (
        <Card
            key={team.id}
            className="w-full gap-4"
            onClick={() => {
                pushPopup(<TeamPopup team={team} closePopup={popPopup} />);
            }}
        >
            <span className="flex items-start justify-between gap-3">
                {/* Primary team details */}
                <div className="flex min-w-0 items-center gap-3">
                    {/* Team Logo (first 2 characters) */}
                    <TeamIcon team={team} />
                    {/* Title and member count */}
                    <div className="min-w-0">
                        <p className="text-text-primary truncate text-[14px]">
                            {team.name}
                        </p>
                        <p className="text-text-disabled truncate font-mono text-[10px]">
                            {team.member_count}{" "}
                            {team.member_count === 1 ? "member" : "members"}
                        </p>
                    </div>
                </div>
                {/* Ellipsis icon for quick actions popout */}
                <ClickableGroup
                    className="relative shrink-0"
                    onClick={() => setTeamsPopoutOpen((prev) => !prev)}
                >
                    <EllipsisVerticalIcon size={16} />
                    {teamsPopoutOpen && (
                        <Popout
                            xPos="left"
                            yPos="bottom"
                            ref={popoutRef}
                            title="team"
                        >
                            <Button
                                variant="secondary-transparent"
                                className="w-full justify-start rounded-none px-3"
                            >
                                <PencilIcon size={14} />
                                edit
                            </Button>
                            <Button
                                variant="danger-transparent"
                                className="w-full justify-start rounded-none px-3"
                            >
                                <TrashIcon size={14} />
                                delete
                            </Button>
                        </Popout>
                    )}
                </ClickableGroup>
            </span>
            {/* Team Description */}
            <p className="text-text-secondary text-[12px] leading-relaxed">
                {team.description}
            </p>
            <Divider />
        </Card>
    );
};

export default TeamsGridTeam;
