import { twMerge } from "tailwind-merge";
import type { UserProfile } from "../../api/profiles";
import UserAvatar from "../UserAvatar/UserAvatar";

interface AvatarStackProps {
    className?: string;
    avatarClassName?: string; // classes for each avatar, e.g. the ring colour
    profiles: UserProfile[];
    max?: number; // profiles shown before the overflow count
}

// Overlapping row of avatars, ringed in the surface colour behind them
const AvatarStack = ({
    className,
    avatarClassName,
    profiles,
    max = 4,
}: AvatarStackProps) => {
    const shown = profiles.slice(0, max);
    const overflow = profiles.length - shown.length;

    return (
        <div className={twMerge("flex items-center", className)}>
            {shown.map((profile) => (
                <UserAvatar
                    key={profile.id}
                    profile={profile}
                    size="sm"
                    className={twMerge(
                        "ring-background -ml-1.5 ring-2 first:ml-0",
                        avatarClassName
                    )}
                />
            ))}
            {overflow > 0 && (
                <span
                    className={twMerge(
                        "bg-surface-hover text-text-secondary ring-background -ml-1.5 flex size-6.5 items-center justify-center rounded-full font-mono text-[9.5px] ring-2",
                        avatarClassName
                    )}
                >
                    +{overflow}
                </span>
            )}
        </div>
    );
};

export default AvatarStack;
