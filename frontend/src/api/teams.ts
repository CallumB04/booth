import { api } from ".";
import type { CustomAppColor } from "../constants/colors";
import type { UserProfile } from "./profiles";

// Models

export type Team = {
    id: string;
    organisation_id: string;
    name: string;
    description: string;
    color: CustomAppColor;
    created_at: string; // ISO string
};

export type TeamMember = {
    user: UserProfile;
    joined_at: string; // ISO string
};

// API Calls

// Fetches all teams of the given organisation
export const fetchTeams = async (org_id: string) => {
    const res = await api.get<Team[]>("/v1/organisations/" + org_id + "/teams");
    return res.data;
};

// Fetches all members of an team
export const fetchTeamMembers = async (org_id: string, team_id: string) => {
    const res = await api.get<TeamMember[]>(
        "/v1/organisations/" + org_id + "/teams" + team_id + "/members"
    );
    return res.data;
};
