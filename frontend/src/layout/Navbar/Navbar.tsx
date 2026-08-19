import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import LinkButton from "../../components/Button/LinkButton";
import AppLogo from "../../components/AppLogo/AppLogo";
import { useUser } from "../../contexts/UserContext";
import { usePopup } from "../../contexts/PopupContext";
import SignupLoginPopup from "../Popups/SignupLoginPopup";

interface NavbarProps {
    className?: string;
}

const links = [
    { label: "product", href: "#product" },
    { label: "ai", href: "#ai" },
    { label: "integrations", href: "#integrations" },
    { label: "pricing", href: "#pricing" },
];

// Public navbar, only mounted by the marketing layout
const Navbar = ({ className }: NavbarProps) => {
    const { sessionLoading, user } = useUser();
    const { pushPopup, popPopup } = usePopup();

    return (
        <nav
            className={twMerge(
                "border-b-layout-border bg-background/72 h-topbar-height fixed top-0 left-0 z-99 flex w-screen items-center border-b px-4 backdrop-blur-xl sm:px-8",
                className
            )}
        >
            <span className="mx-auto flex w-full max-w-5xl items-center justify-between gap-8">
                {/* Logo / Brand text */}
                <Link to="/" onClick={() => window.scrollTo({ top: 0 })}>
                    <AppLogo />
                </Link>

                {/* Middle nav links */}
                <div className="hidden flex-1 justify-center gap-7 lg:flex">
                    {links.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-text-secondary hover:text-highlight font-mono text-[11px] tracking-wider uppercase transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Navbar options */}
                {sessionLoading ? (
                    <></>
                ) : user ? (
                    <LinkButton to="/dashboard" variant="primary">
                        Go to booth
                    </LinkButton>
                ) : (
                    <span className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                                pushPopup(
                                    <SignupLoginPopup
                                        closePopup={popPopup}
                                        initialState="login"
                                    />
                                )
                            }
                        >
                            Log in
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                                pushPopup(
                                    <SignupLoginPopup
                                        closePopup={popPopup}
                                        initialState="signup"
                                    />
                                )
                            }
                        >
                            Sign up
                        </Button>
                    </span>
                )}
            </span>
        </nav>
    );
};

export default Navbar;
