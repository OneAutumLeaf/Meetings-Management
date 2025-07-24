// src/components/layout/Sidebar.js

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import staticMenuData from '../../data/menuData'; 
import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const [submenuOpen, setSubmenuOpen] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // This effect correctly opens the parent menu if the user is on a child page.
  useEffect(() => {
    const openState = {};
    staticMenuData.forEach((item) => {
      if (item.submenu && item.submenu.some(sub => location.pathname.startsWith(sub.path))) {
        openState[item.id] = true;
      }
    });
    setSubmenuOpen(openState);
  }, [location.pathname]);

  const handleToggleSubmenu = (id) => {
    setSubmenuOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBackdropClick = () => {
    if (isMobile && isOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-backdrop" onClick={handleBackdropClick}></div>
      )}

      <nav className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <h5 className="app-title m-0">
            {isOpen ? 'Meeting Management' : 'MM'}
          </h5>
        </div>

        <ul className="nav-menu">
          {staticMenuData.map((item) => (
            <React.Fragment key={item.id}>
              {/* --- PARENT MENU ITEM --- */}
              <li className="nav-item">
                {item.submenu ? (
                  // If it has a submenu, it's a clickable div, not a NavLink
                  <div
                    className="nav-link-item"
                    onClick={() => handleToggleSubmenu(item.id)}
                    role="button"
                    title={item.label}
                  >
                    <i className={`bi bi-${item.icon}`} />
                    <span className="nav-label">{item.label}</span>
                    {isOpen && <i className={`bi bi-chevron-down ms-auto arrow ${submenuOpen[item.id] ? 'open' : ''}`} />}
                  </div>
                ) : (
                  // If no submenu, it's a regular NavLink
                  <NavLink to={item.path} className="nav-link-item" title={item.label}>
                    <i className={`bi bi-${item.icon}`} />
                    <span className="nav-label">{item.label}</span>
                  </NavLink>
                )}
              </li>

              {/* --- SUBMENU ITEMS (Rendered as siblings) --- */}
              {isOpen && item.submenu && submenuOpen[item.id] && (
                item.submenu.map((sub) => (
                  <li key={sub.id} className="nav-item submenu-item">
                    <NavLink to={sub.path} className="nav-link-item" title={sub.label}>
                      {/* Submenu Icon */}
                      <i className={`bi bi-${sub.icon}`} /> 
                      {/* Submenu Label */}
                      <span className="nav-label">{sub.label}</span>
                    </NavLink>
                  </li>
                ))
              )}
            </React.Fragment>
          ))}
        </ul>

        <div 
          className="sidebar-footer" 
          onClick={toggleSidebar} 
          role="button"
          title={isOpen ? "Collapse Menu" : "Expand Menu"}
        >
          <i className={`bi ${isOpen ? 'bi-chevron-double-left' : 'bi-chevron-double-right'}`}></i>
        </div>
        
      </nav>
    </>
  );
};

export default Sidebar;