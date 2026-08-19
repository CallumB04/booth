import { useRef } from "react";
import Popout from "../../components/Popout/Popout";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";
import LinkButton from "../../components/Button/LinkButton";
import Divider from "../../components/Divider/Divider";
import Button from "../../components/Button/Button";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface UserProfilePopoutProps {
    className?: string;
    closePopout: () => void;
}

const UserProfilePopout = ({
    className,
    closePopout,
}: UserProfilePopoutProps) => {
    const { signOut } = useUser();
    const navigate = useNavigate();

    const popoutRef = useRef<HTMLDivElement>(null);
    useClickOutside(popoutRef, closePopout); // close when click outside

    const handleSignOut = () => {
        signOut();
        closePopout();
        navigate("/");
    };

    return (
        <Popout
            xPos="left"
            yPos="bottom"
            contentClassName={twMerge("flex flex-col", className)}
            ref={popoutRef}
            title={"Account"}
        >
            {/* Primary Actions */}
            <div className="flex min-w-52 flex-col">
                {/* My Profile */}
                <LinkButton
                    variant="secondary-transparent"
                    to="/profile"
                    onClick={closePopout}
                    linkClassName="w-full"
                    buttonClassName="h-9 w-full justify-start gap-2.5 rounded-none px-3 text-[13px] lowercase tracking-normal font-sans"
                >
                    <UserIcon size={15} className="shrink-0" />
                    My Profile
                </LinkButton>
                {/* Settings */}
                <LinkButton
                    variant="secondary-transparent"
                    to="/settings"
                    onClick={closePopout}
                    className="w-full"
                    buttonClassName="h-9 w-full justify-start gap-2.5 rounded-none px-3 text-[13px] lowercase tracking-normal font-sans"
                >
                    <SettingsIcon size={15} className="shrink-0" />
                    Settings
                </LinkButton>
            </div>
            <Divider />
            {/* Sign Out */}
            <Button
                variant="danger-transparent"
                className="h-9 w-full justify-start gap-2.5 rounded-none px-3 font-sans text-[13px] tracking-normal lowercase"
                onClick={handleSignOut}
            >
                <LogOutIcon size={15} className="shrink-0" />
                Sign out
            </Button>
        </Popout>
    );
};

export default UserProfilePopout;
