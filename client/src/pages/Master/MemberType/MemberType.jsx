import React, { useState, useMemo } from "react";
import {
  MdEdit,
  MdClose,
  MdSearch,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import "./MemberType.css"; // The CSS file will also be updated

// --- MOCK DATA (based on your images) ---
const activeMemberData = [
  {
    id: 1,
    memberType: "Chaired Person",
    isChairman: "Yes",
    isGuest: "NO",
    lastModifiedDate: "13 Jan 2023",
    lastModifiedBy: "0100006577-SUJIT KUMAR SHAW",
  },
  {
    id: 2,
    memberType: "Guest",
    isChairman: "NO",
    isGuest: "Yes",
    lastModifiedDate: "13 Jan 2023",
    lastModifiedBy: "0100006577-SUJIT KUMAR SHAW",
  },
  {
    id: 3,
    memberType: "Member",
    isChairman: "NO",
    isGuest: "NO",
    lastModifiedDate: "13 Jan 2023",
    lastModifiedBy: "0100006577-SUJIT KUMAR SHAW",
  },
  {
    id: 4,
    memberType: "Secretaries",
    isChairman: "NO",
    isGuest: "NO",
    lastModifiedDate: "19 Jan 2023",
    lastModifiedBy: "0100105366-SAYANI CHATTERJEE",
  },
];

const discontinuedMemberData = [
  {
    id: 1,
    memberType: "Old Member Role",
    isChairman: "NO",
    isGuest: "NO",
    discontinueDate: "10 Dec 2022",
    discontinuedBy: "0100001234-ADMIN USER",
  },
  {
    id: 2,
    memberType: "Temporary Staff",
    isChairman: "NO",
    isGuest: "Yes",
    discontinueDate: "15 Nov 2022",
    discontinuedBy: "0100006577-SUJIT KUMAR SHAW",
  },
];


// ====================================================================
// --- NEW MODAL COMPONENT ---
// ====================================================================
const AddMemberTypeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Member Type</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="memberType">Member Type<span>*</span></label>
            <input type="text" id="memberType" placeholder="Enter Member Type" />
          </div>
          <div className="form-group">
            <label htmlFor="chairman">Chairman<span>*</span></label>
            <select id="chairman" defaultValue="No">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="guest">Guest<span>*</span></label>
            <select id="guest" className="guest-select" defaultValue="Yes">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-save">Save</button>
          <button className="btn-cancel" onClick={onClose}>Add New / Cancel</button>
        </div>
      </div>
    </div>
  );
};


// ====================================================================
// --- UPDATED MAIN COMPONENT ---
// ====================================================================
const MemberType = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  
  // --- NEW STATE FOR MODAL ---
  const [isModalOpen, setModalOpen] = useState(false);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSearchTerm("");
    setCurrentPage(1);
    if (tab === 'discontinue') {
        setLoading(true);
        setTimeout(() => setLoading(false), 800);
    }
  };

  const data = activeTab === "active" ? activeMemberData : discontinuedMemberData;

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  
  const startIndex = (currentPage - 1) * entriesPerPage + 1;
  const endIndex = Math.min(startIndex + entriesPerPage - 1, filteredData.length);

  return (
    <div className="member-type-page">
      {/* --- RENDER THE NEW MODAL HERE --- */}
      <AddMemberTypeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <div className="header">
        <h1 className="title">Member Type</h1>
        {/* --- ADD ONCLICK TO OPEN MODAL --- */}
        <button className="entry-button" onClick={() => setModalOpen(true)}>
            Entry
        </button>
      </div>

      <div className="content-card">
        <div className="tabs">
          <button
            onClick={() => handleTabClick("active")}
            className={`tab-button ${activeTab === "active" ? "active" : ""}`}
          >
            Active
          </button>
          <button
            onClick={() => handleTabClick("discontinue")}
            className={`tab-button ${
              activeTab === "discontinue" ? "active" : ""
            }`}
          >
            Discontinue
          </button>
        </div>

        <div className="controls">
          <div className="show-entries">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="search-container">
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              placeholder="Search records"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              {activeTab === "active" ? (
                <tr>
                  <th>SL No.</th>
                  <th>Action</th>
                  <th>Member Type</th>
                  <th>Chairman</th>
                  <th>Guest</th>
                  <th>Last Modified Date</th>
                  <th>Last Modified By</th>
                </tr>
              ) : (
                <tr>
                  <th>SL No.</th>
                  <th>Member Type</th>
                  <th>Chairman</th>
                  <th>Guest</th>
                  <th>Discontinue Date</th>
                  <th>Discontinue By</th>
                </tr>
              )}
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={activeTab === 'active' ? 7 : 6} className="loading-cell">Loading ....</td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) =>
                  activeTab === "active" ? (
                    <tr key={item.id}>
                      <td>{startIndex + index}</td>
                      <td>
                        <div className="action-icons">
                          <button className="icon-button edit-icon">
                            <MdEdit />
                          </button>
                          <button className="icon-button delete-icon">
                            <MdClose />
                          </button>
                        </div>
                      </td>
                      <td>{item.memberType}</td>
                      <td>{item.isChairman}</td>
                      <td>{item.isGuest}</td>
                      <td>{item.lastModifiedDate}</td>
                      <td>{item.lastModifiedBy}</td>
                    </tr>
                  ) : (
                    <tr key={item.id}>
                      <td>{startIndex + index}</td>
                      <td>{item.memberType}</td>
                      <td>{item.isChairman}</td>
                      <td>{item.isGuest}</td>
                      <td>{item.discontinueDate}</td>
                      <td>{item.discontinuedBy}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={activeTab === 'active' ? 7 : 6} className="no-data-cell">
                    Showing 0 to 0 of 0 entries
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-footer">
          <div className="showing-entries-info">
             {paginatedData.length > 0 ? `Showing ${startIndex} to ${endIndex} of ${filteredData.length} entries` : ''}
          </div>
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              <MdChevronLeft /> Previous
            </button>
            <span className="page-number active">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next <MdChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberType;