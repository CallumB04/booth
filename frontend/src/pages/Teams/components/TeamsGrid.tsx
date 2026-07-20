import { twMerge } from "tailwind-merge";
import type { Team } from "../../../api/teams";
import { useEffect } from "react";
import TeamsGridTeam from "./TeamsGridTeam";

interface TeamsGridProps {
    className?: string;
    teams: Team[];
}

const TeamsGrid = ({ className, teams }: TeamsGridProps) => {
    useEffect(() => {
        console.log(teams);
    }, []);
    return (
        <div className={twMerge("grid grid-cols-3 gap-4", className)}>
            {teams?.map((t) => (
                <TeamsGridTeam team={t} />
            ))}
        </div>
    );
};

export default TeamsGrid;
