import type { CustomAppColor } from "../constants/colors";

// Convert custom app color to classes for team icon
export const customAppColorToTeamIconClasses = (color: CustomAppColor) => {
    switch (color) {
        case "blue":
            return "bg-app-blue/13 border-app-blue/22 text-app-blue";
        case "green":
            return "bg-app-green/13 border-app-green/22 text-app-green";
        case "purple":
            return "bg-app-purple/13 border-app-purple/22 text-app-purple";
        case "cyan":
            return "bg-app-cyan/13 border-app-cyan/22 text-app-cyan";
        case "orange":
            return "bg-app-orange/13 border-app-orange/22 text-app-orange";
        case "slate":
            return "bg-app-slate/13 border-app-slate/22 text-app-slate";
        case "red":
            return "bg-app-red/13 border-app-red/22 text-app-red";
        case "pink":
            return "bg-app-pink/13 border-app-pink/22 text-app-pink";
        case "amber":
            return "bg-app-amber/13 border-app-amber/22 text-app-amber";
        case "teal":
            return "bg-app-teal/13 border-app-teal/22 text-app-teal";
        case "violet":
            return "bg-app-violet/13 border-app-violet/22 text-app-violet";
        case "sky":
            return "bg-app-sky/13 border-app-sky/22 text-app-sky";
    }
};
