import { twMerge } from "tailwind-merge";
import type { Team } from "../../../api/teams";
import TeamsGridTeam from "./TeamsGridTeam";

interface TeamsGridProps {
    className?: string;
    teams: Team[];
}

const TeamsGrid = ({ className, teams }: TeamsGridProps) => {
    return (
        <div
            className={twMerge(
                "grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3",
                className
            )}
        >
            {teams?.map((t) => (
                <TeamsGridTeam team={t} key={t.id} />
            ))}
        </div>
    );
};

export default TeamsGrid;
