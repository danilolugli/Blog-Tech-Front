import { Outlet } from "react-router-dom";

import SideBar from "../components/Sidebar/SideBar";

import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="app-container">
      <SideBar />

      <main className="main">
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;