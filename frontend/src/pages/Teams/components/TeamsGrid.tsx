import { twMerge } from "tailwind-merge";
import type { Team } from "../../../api/teams";
import TeamsGridTeam from "./TeamsGridTeam";

interface TeamsGridProps {
    className?: string;
    teams: Team[];
}

const TeamsGrid = ({ className, teams }: TeamsGridProps) => {
    return (
        <div className={twMerge("grid grid-cols-3 gap-4", className)}>
            {teams?.map((t) => (
                <TeamsGridTeam team={t} key={t.id} />
            ))}
        </div>
    );
};

export default TeamsGrid;
