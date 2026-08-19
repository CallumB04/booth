import { twMerge } from "tailwind-merge";
import type { UserProfile } from "../../api/profiles";
import { EllipsisIcon } from "lucide-react";
import { Link } from "react-router-dom";

type UserAvatarSize = "lg" | "default" | "sm" | "xs";

interface UserAvatarProps {
    className?: string;
    profile: UserProfile | undefined;
    size?: UserAvatarSize;
    to?: string;
    onClick?: () => void;
}

const getSizeClasses = (size: UserAvatarSize) => {
    switch (size) {
        case "lg":
            return "size-8 text-[11px]";
        case "default":
            return "size-6.5 text-[10px]";
        case "sm":
            return "size-5 text-[8.5px]";
        case "xs":
            return "size-5 text-[8.5px]";
    }
};

const UserAvatar = ({
    className,
    profile,
    size = "default",
    to,
    onClick,
}: UserAvatarProps) => {
    // React router Link element if 'to' provided
    if (to) {
        return (
            <Link to={to} className="w-max">
                <Avatar
                    className={twMerge("cursor-pointer", className)}
                    profile={profile}
                    size={size}
                    onClick={onClick}
                />
            </Link>
        );
    }

    // Standard avatar without Link elements
    return (
        <Avatar
            className={className}
            profile={profile}
            size={size}
            onClick={onClick}
        />
    );
};

// Base avatar JSX, used within parent component
const Avatar = ({
    className,
    profile,
    size = "default",
    onClick,
}: UserAvatarProps) => {
    return (
        <div
            className={twMerge(
                "bg-highlight/14 text-highlight-soft flex shrink-0 items-center justify-center rounded-full text-center font-mono transition-colors",
                getSizeClasses(size),
                onClick && "hover:bg-highlight/22 cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {profile ? (
                <p className="uppercase select-none">
                    {profile.first_name[0] +
                        (profile.last_name ? profile.last_name[0] : "")}
                </p>
            ) : (
                <EllipsisIcon size={15} />
            )}
        </div>
    );
};

export default UserAvatar;
