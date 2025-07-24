// src/layouts/MainLayout.js

import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";

const MainLayout = ({ sidebarOpen, setSidebarOpen }) => {
  const pageWrapperStyle = {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  };

  const contentWrapperStyle = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  };

  const fixedHeaderStyle = {
    flexShrink: 0,
  };

  const mainFlexContainerStyle = {
    flexGrow: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    padding: '1.5rem 1.5rem 0 1rem',
  };
  

  const growingContentStyle = {
    flexGrow: 1,
  };
  const footerWrapperStyle = {
    marginTop: '1.5rem', 
  };

  return (
    <div style={pageWrapperStyle}>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div style={contentWrapperStyle}>
        <div style={fixedHeaderStyle}>
          <Header
            sidebarOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
        </div>

        <main style={mainFlexContainerStyle}>
          <div style={growingContentStyle}>
            <Breadcrumbs />
            <Outlet />
          </div>
           <div style={footerWrapperStyle}>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
