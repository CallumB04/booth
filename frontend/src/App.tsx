import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import AppLayout from "./layout/AppLayout/AppLayout";
import MarketingLayout from "./layout/MarketingLayout/MarketingLayout";
import PopupRenderer from "./layout/PopupRenderer/PopupRenderer";
import { RequireUser } from "./contexts/UserContext";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import TicketsPage from "./pages/Tickets/TicketsPage";
import MyQueuePage from "./pages/MyQueue/MyQueuePage";
import InboxPage from "./pages/Inbox/InboxPage";
import InsightsPage from "./pages/Insights/InsightsPage";
import KnowledgePage from "./pages/Knowledge/KnowledgePage";
import RequestPage from "./pages/Request/RequestPage";
import TeamsPage from "./pages/Teams/TeamsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import DesignPage from "./pages/Design/DesignPage";

function App() {
    return (
        <BrowserRouter>
            {/* Renders popup at top position of stack (if not empty) */}
            <PopupRenderer />
            <Routes>
                {/* Public pages - top navbar and footer */}
                <Route element={<MarketingLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Application pages - sidebar and topbar shell */}
                <Route element={<AppLayout />}>
                    {/* DESIGN LIBRARY - TODO: REMOVE WHEN DONE */}
                    <Route path="/design" element={<DesignPage />} />
                    {/* Protected routes, must be logged in */}
                    <Route element={<RequireUser />}>
                        {/* Workspace */}
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/tickets" element={<TicketsPage />} />
                        <Route path="/my-queue" element={<MyQueuePage />} />
                        <Route path="/inbox" element={<InboxPage />} />
                        {/* Create */}
                        <Route path="/request" element={<RequestPage />} />
                        {/* Intelligence */}
                        <Route path="/insights" element={<InsightsPage />} />
                        <Route path="/knowledge" element={<KnowledgePage />} />
                        {/* Organisation */}
                        <Route path="/teams" element={<TeamsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
