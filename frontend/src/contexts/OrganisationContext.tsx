import { createContext, useContext, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrganisations, type Organisation } from "../api";
import { useUser } from "./UserContext";

type OrganisationContextType = {
    organisations: Organisation[];
    activeOrganisation: Organisation | undefined;
    setActiveOrganisation: (org: Organisation | undefined) => void;
};

const OrganisationContext = createContext<OrganisationContextType | undefined>(
    undefined
);

export const useOrganisation = () => {
    const context = useContext(OrganisationContext);
    if (!context) {
        throw new Error(
            "useOrganisation must be used within an OrganisationProvider"
        );
    }

    return context;
};

export const OrganisationProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();

    // Load organisations, shared by every consumer through this context
    const { data: organisations } = useQuery({
        queryKey: ["organisations", user?.id], // refetch when user changes
        queryFn: async () => {
            const orgs = await fetchOrganisations();
            return orgs ?? [];
        },
        enabled: !!user?.id, // only fetch if logged in
    });

    // Only the picked id is stored - the organisation itself is derived, so a
    // stale pick (or no pick at all) falls back to the first one in the list
    // rather than leaving the app with no active organisation.
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    const activeOrganisation =
        organisations?.find((o) => o.id === selectedId) ?? organisations?.[0];

    return (
        <OrganisationContext.Provider
            value={{
                organisations: organisations ?? [],
                activeOrganisation,
                setActiveOrganisation: (org) => setSelectedId(org?.id),
            }}
        >
            {children}
        </OrganisationContext.Provider>
    );
};
