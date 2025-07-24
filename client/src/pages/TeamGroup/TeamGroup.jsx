import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdDelete, MdCheckCircle } from "react-icons/md";
import './TeamGroup.css'; // This single CSS file now styles both the page and the modal

// --- MOCK DATA (same as before) ---
const mockActiveGroups = [
  { id: 1, groupName: "Programmer", enteredDate: "05 Feb 2023", enteredBy: "0100006577-SUJIT KUMAR SHAW" },
  { id: 2, groupName: "Corporate Weekly Meeting", enteredDate: "10 Feb 2023", enteredBy: "0100105366-SAYANI CHATTERJEE" },
  { id: 3, groupName: "NIS Morning Meeting", enteredDate: "28 Feb 2023", enteredBy: "0100089658-SREEPURNA CHAKRABORTY" },
  { id: 4, groupName: "FCM KOL", enteredDate: "06 May 2023", enteredBy: "0100101775-Avirup Chakraborty" },
  { id: 5, groupName: "Bill Submission & Collection Process", enteredDate: "10 May 2023", enteredBy: "0100089658-SREEPURNA CHAKRABORTY" },
  { id: 6, groupName: "Workshop On E Attendance", enteredDate: "10 May 2023", enteredBy: "0100089658-SREEPURNA CHAKRABORTY" },
  { id: 7, groupName: "KOL- FCM", enteredDate: "20 May 2023", enteredBy: "0100002343-DEBABRATA GUHA" },
  { id: 8, groupName: "OKR REVIEW GROUP", enteredDate: "22 May 2023", enteredBy: "0100003080-SUBRATA DAS" },
  { id: 9, groupName: "FCM - OKR Review", enteredDate: "24 May 2023", enteredBy: "0100006402-TANMOY MAJUMDER" },
  { id: 10, groupName: "Durgapur Team", enteredDate: "24 May 2023", enteredBy: "0100000100-KRISHNENDU BHANJA" },
  { id: 11, groupName: "Another Team", enteredDate: "25 May 2023", enteredBy: "0100001111-USER ONE" },
  { id: 12, groupName: "Project Alpha", enteredDate: "26 May 2023", enteredBy: "0100002222-USER TWO" },
  { id: 13, groupName: "Project Beta", enteredDate: "27 May 2023", enteredBy: "0100003333-USER THREE" },
  { id: 14, groupName: "HR Department", enteredDate: "28 May 2023", enteredBy: "0100004444-USER FOUR" },
  { id: 15, groupName: "Finance Team", enteredDate: "29 May 2023", enteredBy: "0100005555-USER FIVE" },
  { id: 16, groupName: "IT Support", enteredDate: "30 May 2023", enteredBy: "0100006666-USER SIX" },
  { id: 17, groupName: "Management", enteredDate: "31 May 2023", enteredBy: "0100007777-USER SEVEN" },
];
const mockDiscontinuedGroups = [
    { id: 18, groupName: "Legacy System Support", discontinueDate: "01 Jan 2023", discontinueBy: "0100001234-ADMIN USER" },
    { id: 19, groupName: "Q1 Marketing Campaign", discontinueDate: "15 Feb 2023", discontinueBy: "0100105366-SAYANI CHATTERJEE" },
    { id: 20, groupName: "Old Website Team", discontinueDate: "30 Mar 2023", discontinueBy: "0100006577-SUJIT KUMAR SHAW" },
];

// ====================================================================
// --- MODAL COMPONENT ---
// ====================================================================
const AddGroupModal = ({ isOpen, onClose }) => {
  const [members, setMembers] = useState([{ id: 1, employee: '' }]); // Start with one member row

  if (!isOpen) return null;

  const handleAddRow = () => {
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    setMembers([...members, { id: newId, employee: '' }]);
  };

  const handleRemoveRow = (idToRemove) => {
    // Prevent removing the very last row
    if (members.length <= 1) return;
    setMembers(members.filter(member => member.id !== idToRemove));
  };
  
  const handleReset = () => {
    setMembers([{ id: 1, employee: '' }]);
    onClose(); // Also closes the modal
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Group Name</h2>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="required">Group Name</label>
            <input type="text" placeholder="Enter Group Name" />
          </div>
          <div className="team-members-section">
            <div className="team-members-header">
              <h3>Team Members</h3>
              <button className="add-row-button" onClick={handleAddRow}>+</button>
            </div>
            <div className="table-wrapper-modal">
              <table className="members-table">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Employee Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="select-wrapper">
                           <select defaultValue="">
                             <option value="" disabled>Search Employee</option>
                             <option value="1">0100006577-SUJIT KUMAR SHAW</option>
                             <option value="2">0100105366-SAYANI CHATTERJEE</option>
                             <option value="3">0100089658-SREEPURNA CHAKRABORTY</option>
                             <option value="4">0100101775-Avirup Chakraborty</option>
                           </select>
                        </div>
                      </td>
                      <td className="member-action-cell">
                        <button className="member-action-button add" onClick={handleAddRow}>+</button>
                        <button className="member-action-button remove" onClick={() => handleRemoveRow(member.id)}>
                          <span>×</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="button-primary-modal">Save</button>
          <button className="button-secondary-modal" onClick={handleReset}>Add New / Cancel</button>
        </div>
      </div>
    </div>
  );
};


// ====================================================================
// --- MAIN TEAM GROUP COMPONENT ---
// ====================================================================
const TeamGroup = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [isModalOpen, setModalOpen] = useState(false); // State for modal

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => { setLoading(false); }, 1000);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const filteredData = useMemo(() => {
        const sourceData = activeTab === 'active' ? mockActiveGroups : mockDiscontinuedGroups;
        if (!searchTerm) return sourceData;
        return sourceData.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [activeTab, searchTerm]);
    
    // --- Pagination Logic ---
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startEntry = filteredData.length > 0 ? indexOfFirstEntry + 1 : 0;
    const endEntry = Math.min(indexOfLastEntry, filteredData.length);

    // --- Event Handlers ---
    const handlePageChange = (page) => setCurrentPage(page);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setSearchTerm('');
    };

    // --- Render Functions ---
    const renderTableHeaders = () => (
        <tr>
            <th>SL No.</th>
            <th>Action</th>
            <th>Group Name</th>
            {activeTab === 'active' ? (
                <>
                    <th>Entered Date</th>
                    <th>Entered By</th>
                </>
            ) : (
                <>
                    <th>Discontinue Date</th>
                    <th>Discontinue By</th>
                </>
            )}
        </tr>
    );

    const renderTableBody = () => {
        if (loading) return <tr><td colSpan="5" className="loading-text">Loading !...</td></tr>;
        if (currentEntries.length === 0) return <tr><td colSpan="5" className="no-data-text">No records found</td></tr>;
        return currentEntries.map((item, index) => (
            <tr key={item.id}>
                <td>{indexOfFirstEntry + index + 1}</td>
                <td className="action-cell">
                    <button className="icon-button-action view" title="View"><MdCheckCircle /></button>
                    <button className="icon-button-action edit" title="Edit"><MdEdit /></button>
                    <button className="icon-button-action delete" title="Delete"><MdDelete /></button>
                </td>
                <td>{item.groupName}</td>
                <td>{activeTab === 'active' ? item.enteredDate : item.discontinueDate}</td>
                <td>{activeTab === 'active' ? item.enteredBy : item.discontinueBy}</td>
            </tr>
        ));
    };

    return (
        <>
            <div className="team-group-container">
                <div className="team-group-header">
                    <h1>Team Group</h1>
                    <button className="entry-button" onClick={() => setModalOpen(true)}>Entry</button>
                </div>
                <div className="team-group-body">
                    <div className="tabs">
                        <button className={`tab-button ${activeTab === 'active' ? 'active' : ''}`} onClick={() => handleTabClick('active')}>Active</button>
                        <button className={`tab-button ${activeTab === 'discontinue' ? 'active' : ''}`} onClick={() => handleTabClick('discontinue')}>Discontinue</button>
                    </div>
                    <div className="table-controls">
                        <div className="show-entries">
                            <label htmlFor="entries">Show</label>
                            <select id="entries" value={entriesPerPage} onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span>entries</span>
                        </div>
                        <div className="search-records">
                            <label htmlFor="search">Search:</label>
                            <input type="text" id="search" placeholder="Search records" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}/>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>{renderTableHeaders()}</thead>
                            <tbody>{renderTableBody()}</tbody>
                        </table>
                    </div>
                    <div className="table-pagination">
                        <div className="showing-entries-info">
                            Showing {startEntry} to {endEntry} of {filteredData.length} entries
                        </div>
                        <div className="pagination-buttons">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> Previous</button>
                            {[...Array(totalPages).keys()].map(number => (
                                <button key={number + 1} onClick={() => handlePageChange(number + 1)} className={currentPage === number + 1 ? 'active-page' : ''}>
                                    {number + 1}
                                </button>
                            ))}
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <AddGroupModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};

export default TeamGroup;