import { Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

interface MarketingLayoutProps {
    className?: string;
}

// Shell for the public pages, the only place the top Navbar and Footer appear
const MarketingLayout = ({ className }: MarketingLayoutProps) => {
    return (
        <div className={twMerge("bg-background min-h-screen", className)}>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MarketingLayout;
