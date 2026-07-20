import type { CustomAppColor } from "../constants/colors";

// Convert custom app color to classes for team icon
export const customAppColorToTeamIconClasses = (color: CustomAppColor) => {
    switch (color) {
        case "blue":
            return "bg-app-blue/15 text-app-blue";
        case "green":
            return "bg-app-green/15 text-app-green";
        case "purple":
            return "bg-app-purple/15 text-app-purple";
        case "cyan":
            return "bg-app-cyan/15 text-app-cyan";
        case "orange":
            return "bg-app-orange/15 text-app-orange";
        case "slate":
            return "bg-app-slate/15 text-app-slate";
        case "red":
            return "bg-app-red/15 text-app-red";
        case "pink":
            return "bg-app-pink/15 text-app-pink";
        case "amber":
            return "bg-app-amber/15 text-app-amber";
        case "teal":
            return "bg-app-teal/15 text-app-teal";
        case "violet":
            return "bg-app-violet/15 text-app-violet";
        case "sky":
            return "bg-app-sky/15 text-app-sky";
    }
};
