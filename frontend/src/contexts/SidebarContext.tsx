import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import useWindowBounds from "../hooks/useWindowBounds";

type SidebarContextType = {
    isMobileSidebarOpen: boolean;
    openMobileSidebar: () => void;
    closeMobileSidebar: () => void;
    toggleMobileSidebar: () => void;
    // Whether a Sidebar component is currently mounted on the page.
    // Layout components (Footer, Page) read this to know whether to offset
    // for the fixed sidebar width — no need for hardcoded route lists.
    isSidebarMounted: boolean;
    registerSidebar: () => void;
    unregisterSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used with a SidebarProvider");
    }

    return context;
};

const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
    const [mountCount, setMountCount] = useState<number>(0);
    const { width } = useWindowBounds();

    // Close mobile sidebar if page width updates
    useEffect(() => {
        setMobileSidebarOpen(false);
    }, [width]);

    const registerSidebar = useCallback(() => {
        setMountCount((prev) => prev + 1);
    }, []);

    const unregisterSidebar = useCallback(() => {
        setMountCount((prev) => Math.max(0, prev - 1));
    }, []);

    return (
        <SidebarContext.Provider
            value={{
                isMobileSidebarOpen: mobileSidebarOpen,
                openMobileSidebar: () => setMobileSidebarOpen(true),
                closeMobileSidebar: () => setMobileSidebarOpen(false),
                toggleMobileSidebar: () =>
                    setMobileSidebarOpen((prev) => !prev),
                isSidebarMounted: mountCount > 0,
                registerSidebar,
                unregisterSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
