
import { useState } from "react";
import './App.css';
import { ThemeProvider } from "./components/ThemeProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WaterSamples from "./pages/WaterSamples";
import TreatmentSimulator from "./pages/TreatmentSimulator";
import Reports from "./pages/Reports";
import AIChatbot from "./pages/AIChatbot";
import Settings from "./pages/Settings";
import IntegrationsSettings from "./pages/settings/IntegrationsSettings";
import AppearanceSettings from "./pages/settings/AppearanceSettings";
import AccountSettings from "./pages/settings/AccountSettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import DataManagementSettings from "./pages/settings/DataManagementSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import HelpDocumentation from "./pages/settings/HelpDocumentation";
import Profile from "./pages/Profile";
import QuickFix from "./pages/QuickFix";
import Diagnostics from "./pages/Diagnostics";
import GenerateReport from "./pages/GenerateReport";
import AlertConfiguration from "./pages/AlertConfiguration";
import HistoricalReports from "./pages/HistoricalReports";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="water-dashboard-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/water-samples" element={<WaterSamples />} />
          <Route path="/treatment-simulator" element={<TreatmentSimulator />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/historical-reports" element={<HistoricalReports />} />
          <Route path="/ai-chatbot" element={<AIChatbot />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/integrations" element={<IntegrationsSettings />} />
          <Route path="/settings/appearance" element={<AppearanceSettings />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/settings/data-management" element={<DataManagementSettings />} />
          <Route path="/settings/security" element={<SecuritySettings />} />
          <Route path="/settings/help" element={<HelpDocumentation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quick-fix" element={<QuickFix />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/generate-report" element={<GenerateReport />} />
          <Route path="/alert-configuration" element={<AlertConfiguration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
