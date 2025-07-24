import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure icons are imported

const Header = () => {
  // Static user object for display purposes
  const user = {
    emp_name: 'John Doe',
    email_id: 'john.doe@example.com',
    designation: 'Senior Developer',
    company_id: 1,
  };

  const username = user?.emp_name || 'User';
  const designation = user?.designation || '---';
  
  // Static company data
  const staticCompanies = [
    { id: 1, name: 'Stellar Innovations', code: 'SI' },
    { id: 2, name: 'Quantum Dynamics', code: 'QD' },
    { id: 3, name: 'Apex Solutions', code: 'AS' },
  ];

  const [companies, setCompanies] = useState(staticCompanies);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(user.company_id);
  
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const companyDropdownRef = useRef(null);

  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const avatarDropdownRef = useRef(null);
  
  // This state is for the modal, which needs the handleCompanyLogout function
  const [showCompanyAlert, setShowCompanyAlert] = useState(false);

  // Sync current company with user data
  useEffect(() => {
    if (companies.length && user?.company_id) {
      const matched = companies.find(c => c.id === user.company_id);
      if (matched) {
        setCurrentCompanyId(matched.id);
      }
    }
  }, [companies, user]);

  // Effect to handle clicks outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
        setCompanyDropdownOpen(false);
      }
      if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(event.target)) {
        setAvatarDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCompanyDropdown = () => setCompanyDropdownOpen(prev => !prev);
  const toggleAvatarDropdown = () => setAvatarDropdownOpen(prev => !prev);

  const handleSelectCompany = (id) => {
    setCurrentCompanyId(id);
    setCompanyDropdownOpen(false);
  };
  
  // Dummy handler for the new mail configuration option
  const handleMailConfig = () => {
    console.log("Action: Mail Configuration clicked.");
    setAvatarDropdownOpen(false); // Close dropdown after action
  };
  
  // This is the function that was previously missing, causing the crash
  const handleCompanyLogout = () => {
    console.log("Action: Continue to change company (dummy).");
    setShowCompanyAlert(false);
  };

  // Dummy handler for logout
  const logoutUser = () => {
    console.log("Action: Logout clicked.");
    setAvatarDropdownOpen(false); // Close dropdown after action
  };

  const getInitials = name => name?.split(' ').map(n => n[0]?.toUpperCase()).join('') || '';
  const currentCompany = companies.find(c => c.id === currentCompanyId) || {};

  return (
    <>
      <header className="compact-professional-header">
        {/* Brand Section */}
        <div className="brand-section">
          <div className="brand-logo">
            {currentCompany?.code || 'SI'}
          </div>
          <div className="brand-info">
            <div className="dropdown company-selector" ref={companyDropdownRef}>
              <div className="company-display">
                <span className="current-company-name">
                  {loadingCompanies ? 'Loading...' : currentCompany?.name || 'Select Company'}
                </span>
                <button
                  className="company-dropdown-toggle"
                  onClick={toggleCompanyDropdown}
                  aria-expanded={companyDropdownOpen}
                  type="button"
                >
                  <i className="bi bi-chevron-down"></i>
                </button>
              </div>
              
              {companyDropdownOpen && (
                <div className="dropdown-menu show company-dropdown-menu">
                  {companies.map(company => (
                    <a
                      key={company.id}
                      className={`dropdown-item ${company.id === currentCompanyId ? 'active' : ''}`}
                      onClick={() => handleSelectCompany(company.id)}
                      style={{cursor: 'pointer'}}
                    >
                      <div className="company-item">
                        <div className="company-code">{company.code}</div>
                        <div className="company-details">
                          <div className="company-name">{company.name}</div>
                          <div className="company-subtitle">Switch to this company</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="dashboard-label">Dashboard</div>
          </div>
        </div>

        {/* User Section */}
        <div className="user-section" ref={avatarDropdownRef}>
          <div className="user-info">
            <p className="user-name">{username}</p>
            <p className="user-role">{designation}</p>
          </div>
          <button 
            className="avatar-btn" 
            onClick={toggleAvatarDropdown} 
            aria-expanded={avatarDropdownOpen} 
            title={username}
          >
            {getInitials(username)}
          </button>
          
          {avatarDropdownOpen && (
            <div className="dropdown-menu dropdown-menu-end show avatar-dropdown">
              <div className="dropdown-user-info">
                <p className="dropdown-user-name">{username}</p>
                <p className="dropdown-user-designation">{designation}</p>
              </div>
              <hr className="dropdown-divider" />
              <div className="dropdown-actions">
                <button className="dropdown-item" onClick={handleMailConfig}>
                  <i className="bi bi-envelope me-2"></i>
                  Mail Configuration
                </button>
                <button className="dropdown-item text-danger" onClick={logoutUser}>
                  <i className="bi bi-power me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Company Alert Modal - This is part of the code but is not currently triggered */}
      {showCompanyAlert && (
         <div className="modal-backdrop">
           <div className="modal-content p-4 bg-white rounded shadow" style={{ maxWidth: 400, margin: 'auto', marginTop: '15vh' }}>
             <h5>Change Company (Dummy)</h5>
             <p>This is a test prompt. Clicking continue will log a message.</p>
             <div className="d-flex justify-content-end gap-2">
               <button className="btn btn-secondary" onClick={() => setShowCompanyAlert(false)}>Cancel</button>
               <button className="btn btn-primary" onClick={handleCompanyLogout}>Continue</button>
             </div>
           </div>
         </div>
       )}
    </>
  );
};

export default Header;