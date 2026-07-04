import React, { useState } from 'react'

import MainLayout from "./screens/MainUIScreen.jsx";
import DashboardMain from "./screens/main/DashboardMain.jsx";
import Tournament from "./screens/main/Tournament.jsx";
import DataEntry from "./screens/main/DataEntry.jsx";
import Leaderboards from "./screens/main/Leaderboards.jsx";
import Mapping from "./screens/main/Mapping.jsx";
import Analytics from "./screens/main/Analytics.jsx";
import AdminSettings from "./screens/main/AdminSettings.jsx";
import SystemSettings from "./screens/main/SystemSettings.jsx";

import Home from "./screens/landing/Home.jsx";
import AboutUs from "./screens/landing/AboutUs.jsx";
import LoginScreen from "./screens/landing/LoginScreen.jsx";
import Projects from "./screens/landing/Projects.jsx";
import Services from "./screens/landing/Services.jsx";

const landingScreens = {
  Home,
  AboutUs,
  LoginScreen,
  Projects,
  Services,
};

const mainScreens = {
  Dashboard: DashboardMain,
  Tournament,
  "Data Entry": DataEntry,
  Mappings: Mapping,
  "Players & Teams": () => <div className="p-6 text-gray-300">Players & Teams (not implemented)</div>,
  Leaderboards,
  Analytics,
  Admin: AdminSettings,
  Settings: SystemSettings,
};

function NotFound() {
  return <div className="p-6 text-gray-300">Screen not found.</div>;
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState('Home');

  if (landingScreens[activeScreen]) {
    const Comp = landingScreens[activeScreen];
    return (
      <div>
        <Comp />
        <div className="fixed bottom-6 right-6">
          <button onClick={() => setActiveScreen('Dashboard')} className="bg-blue-600 text-white px-4 py-2 rounded">Enter App</button>
        </div>
      </div>
    );
  }

  const ScreenComp = mainScreens[activeScreen] || NotFound;

  return (
    <div className="app">
      <MainLayout activePath={activeScreen} onNavigate={setActiveScreen}>
        <ScreenComp />
      </MainLayout>
    </div>
  )
}
