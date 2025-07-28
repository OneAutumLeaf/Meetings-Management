import React, { useState, useEffect, useMemo } from "react";
import { MdEdit, MdDelete, MdCheckCircle, MdClose } from "react-icons/md";
import "./TeamGroup.css"; // This single CSS file now styles all components

// --- MOCK DATA (Updated with standardized employee name format) ---
const mockActiveGroups = [
  {
    id: 1,
    groupName: "Programmer",
    enteredDate: "05 Feb 2023",
    enteredBy: "0100006577-SUJIT KUMAR SHAW",
    members: [
      { id: 101, name: "0100006577-SUJIT KUMAR SHAW" },
      { id: 102, name: "0100003423-JOY BHATTACHARYA" },
      { id: 103, name: "0100001111-ANOTHER DEVELOPER" },
    ],
  },
  {
    id: 2,
    groupName: "Corporate Weekly Meeting",
    enteredDate: "10 Feb 2023",
    enteredBy: "0100105366-SAYANI CHATTERJEE",
    members: [
      { id: 201, name: "0100105366-SAYANI CHATTERJEE" },
      { id: 202, name: "0100002343-DEBABRATA GUHA" },
    ],
  },
  {
    id: 3,
    groupName: "NIS Morning Meeting",
    enteredDate: "28 Feb 2023",
    enteredBy: "0100089658-SREEPURNA CHAKRABORTY",
    members: [],
  },
  {
    id: 4,
    groupName: "FCM KOL",
    enteredDate: "06 May 2023",
    enteredBy: "0100101775-Avirup Chakraborty",
    members: [],
  },
  {
    id: 5,
    groupName: "Bill Submission & Collection Process",
    enteredDate: "10 May 2023",
    enteredBy: "0100089658-SREEPURNA CHAKRABORTY",
    members: [],
  },
  {
    id: 6,
    groupName: "Workshop On E Attendance",
    enteredDate: "10 May 2023",
    enteredBy: "0100089658-SREEPURNA CHAKRABORTY",
    members: [],
  },
  {
    id: 7,
    groupName: "KOL- FCM",
    enteredDate: "20 May 2023",
    enteredBy: "0100002343-DEBABRATA GUHA",
    members: [],
  },
  {
    id: 8,
    groupName: "OKR REVIEW GROUP",
    enteredDate: "22 May 2023",
    enteredBy: "0100003080-SUBRATA DAS",
    members: [],
  },
  {
    id: 9,
    groupName: "FCM - OKR Review",
    enteredDate: "24 May 2023",
    enteredBy: "0100006402-TANMOY MAJUMDER",
    members: [],
  },
  {
    id: 10,
    groupName: "Durgapur Team",
    enteredDate: "24 May 2023",
    enteredBy: "0100000100-KRISHNENDU BHANJA",
    members: [],
  },
  {
    id: 11,
    groupName: "Another Team",
    enteredDate: "25 May 2023",
    enteredBy: "0100001111-USER ONE",
    members: [],
  },
  {
    id: 12,
    groupName: "Project Alpha",
    enteredDate: "26 May 2023",
    enteredBy: "0100002222-USER TWO",
    members: [],
  },
  {
    id: 13,
    groupName: "Project Beta",
    enteredDate: "27 May 2023",
    enteredBy: "0100003333-USER THREE",
    members: [],
  },
  {
    id: 14,
    groupName: "HR Department",
    enteredDate: "28 May 2023",
    enteredBy: "0100004444-USER FOUR",
    members: [],
  },
  {
    id: 15,
    groupName: "Finance Team",
    enteredDate: "29 May 2023",
    enteredBy: "0100005555-USER FIVE",
    members: [],
  },
  {
    id: 16,
    groupName: "IT Support",
    enteredDate: "30 May 2023",
    enteredBy: "0100006666-USER SIX",
    members: [],
  },
  {
    id: 17,
    groupName: "Management",
    enteredDate: "31 May 2023",
    enteredBy: "0100007777-USER SEVEN",
    members: [],
  },
];
const mockDiscontinuedGroups = [
  {
    id: 18,
    groupName: "Legacy System Support",
    discontinueDate: "01 Jan 2023",
    discontinueBy: "0100001234-ADMIN USER",
    members: [],
  },
  {
    id: 19,
    groupName: "Q1 Marketing Campaign",
    discontinueDate: "15 Feb 2023",
    discontinueBy: "0100105366-SAYANI CHATTERJEE",
    members: [],
  },
  {
    id: 20,
    groupName: "Old Website Team",
    discontinueDate: "30 Mar 2023",
    discontinueBy: "0100006577-SUJIT KUMAR SHAW",
    members: [],
  },
];
const allEmployees = [
  { id: "emp1", name: "0100006577-SUJIT KUMAR SHAW" },
  { id: "emp2", name: "0100105366-SAYANI CHATTERJEE" },
  { id: "emp3", name: "0100089658-SREEPURNA CHAKRABORTY" },
  { id: "emp4", name: "0100101775-Avirup Chakraborty" },
  { id: "emp5", name: "0100002343-DEBABRATA GUHA" },
  { id: "emp6", name: "0100003423-JOY BHATTACHARYA" },
];

// ====================================================================
// --- MODIFY GROUP MODAL ---
// ====================================================================
const ModifyGroupModal = ({ isOpen, onClose, group }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (group) {
      setGroupName(group.groupName || "");
      const initialMembers =
        group.members?.map((m) => ({ ...m, isNew: false })) || [];
      if (initialMembers.length === 0) {
        initialMembers.push({ id: Date.now(), name: "", isNew: true });
      }
      setMembers(initialMembers);
    }
  }, [group]);

  if (!isOpen || !group) return null;

  const handleAddRow = () => {
    setMembers([...members, { id: Date.now(), name: "", isNew: true }]);
  };

  const handleRemoveRow = (idToRemove) => {
    if (members.length <= 1) return;
    setMembers(members.filter((member) => member.id !== idToRemove));
  };

  const handleReset = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Modify {groupName}</h2>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="required">Group Name</label>
            <input type="text" value={groupName} disabled />
          </div>
          <div className="team-members-section">
            <div className="team-members-header">
              <h3>Team Members</h3>
              <button className="add-row-button" onClick={handleAddRow}>
                +
              </button>
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
                        {member.isNew ? (
                          <div className="select-wrapper">
                            <select defaultValue="">
                              <option value="" disabled>
                                Search Employee
                              </option>
                              {allEmployees.map((emp) => (
                                <option key={emp.id} value={emp.name}>
                                  {emp.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <input type="text" value={member.name} disabled />
                        )}
                      </td>
                      <td className="member-action-cell">
                        <button
                          className="member-action-button add"
                          onClick={handleAddRow}
                        >
                          +
                        </button>
                        <button
                          className="member-action-button remove"
                          onClick={() => handleRemoveRow(member.id)}
                        >
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
          <button className="button-secondary-modal" onClick={handleReset}>
            Add New / Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// --- VIEW MEMBERS MODAL (Unchanged)---
// ====================================================================
const ViewMembersModal = ({ isOpen, onClose, group }) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    if (group?.members) {
      setMembers(group.members);
    }
  }, [group]);
  if (!isOpen || !group) return null;
  const handleDeleteMember = (memberId) => {
    setMembers((current) => current.filter((m) => m.id !== memberId));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="view-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="view-modal-header">
          <h2>Team Members</h2>
          <button className="view-modal-close-button" onClick={onClose}>
            <MdClose size={20} />
          </button>
        </div>
        <div className="view-modal-body">
          <table className="view-members-table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Employee Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>{member.name}</td>
                    <td className="view-member-action-cell">
                      <button
                        className="view-member-delete-button"
                        title="Delete Member"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-members-text">
                    No members in this group.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// --- ADD GROUP MODAL (Unchanged) ---
// ====================================================================
const AddGroupModal = ({ isOpen, onClose }) => {
  const [members, setMembers] = useState([{ id: 1, employee: "" }]);
  if (!isOpen) return null;
  const handleAddRow = () => {
    setMembers([...members, { id: Date.now(), employee: "" }]);
  };
  const handleRemoveRow = (id) => {
    if (members.length > 1) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };
  const handleReset = () => {
    setMembers([{ id: 1, employee: "" }]);
    onClose();
  };

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
              <button className="add-row-button" onClick={handleAddRow}>
                +
              </button>
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
                            <option value="" disabled>
                              Search Employee
                            </option>
                            {allEmployees.map((e) => (
                              <option key={e.id} value={e.name}>
                                {e.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="member-action-cell">
                        <button
                          className="member-action-button add"
                          onClick={handleAddRow}
                        >
                          +
                        </button>
                        <button
                          className="member-action-button remove"
                          onClick={() => handleRemoveRow(member.id)}
                        >
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
          <button className="button-secondary-modal" onClick={handleReset}>
            Add New / Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// --- MAIN TEAM GROUP COMPONENT ---
// ====================================================================
const TeamGroup = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isModifyModalOpen, setModifyModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredData = useMemo(() => {
    const sourceData =
      activeTab === "active" ? mockActiveGroups : mockDiscontinuedGroups;
    if (!searchTerm) return sourceData;
    return sourceData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [activeTab, searchTerm]);

  // --- Pagination Logic ---
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startEntry = filteredData.length > 0 ? indexOfFirstEntry + 1 : 0;
  const endEntry = Math.min(indexOfLastEntry, filteredData.length);

  // --- Event Handlers ---
  const handlePageChange = (page) => setCurrentPage(page);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
  };
  const handleViewClick = (group) => {
    setSelectedGroup(group);
    setViewModalOpen(true);
  };
  const handleEditClick = (group) => {
    setSelectedGroup(group);
    setModifyModalOpen(true);
  };

  // --- Render Functions ---
  const renderTableHeaders = () => (
    <tr>
      <th>SL No.</th>
      <th>Action</th>
      <th>Group Name</th>
      {activeTab === "active" ? (
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
    if (loading)
      return (
        <tr>
          <td colSpan="5" className="loading-text">
            Loading !...
          </td>
        </tr>
      );
    if (currentEntries.length === 0)
      return (
        <tr>
          <td colSpan="5" className="no-data-text">
            No records found
          </td>
        </tr>
      );
    return currentEntries.map((item, index) => (
      <tr key={item.id}>
        <td>{indexOfFirstEntry + index + 1}</td>
        <td className="action-cell">
          <button
            className="icon-button-action view"
            title="View"
            onClick={() => handleViewClick(item)}
          >
            <MdCheckCircle />
          </button>
          <button
            className="icon-button-action edit"
            title="Edit"
            onClick={() => handleEditClick(item)}
          >
            <MdEdit />
          </button>
          <button className="icon-button-action delete" title="Delete">
            <MdDelete />
          </button>
        </td>
        <td>{item.groupName}</td>
        <td>
          {activeTab === "active" ? item.enteredDate : item.discontinueDate}
        </td>
        <td>{activeTab === "active" ? item.enteredBy : item.discontinueBy}</td>
      </tr>
    ));
  };

  return (
    <>
      <div className="team-group-container">
        <div className="team-group-header">
          <h1>Team Group</h1>
          <button
            className="entry-button"
            onClick={() => setAddModalOpen(true)}
          >
            Entry
          </button>
        </div>
        <div className="team-group-body">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === "active" ? "active" : ""}`}
              onClick={() => handleTabClick("active")}
            >
              Active
            </button>
            <button
              className={`tab-button ${
                activeTab === "discontinue" ? "active" : ""
              }`}
              onClick={() => handleTabClick("discontinue")}
            >
              Discontinue
            </button>
          </div>
          <div className="table-controls">
            <div className="show-entries">
              <label htmlFor="entries">Show</label>
              <select
                id="entries"
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>entries</span>
            </div>
            <div className="search-records">
              <label htmlFor="search">Search:</label>
              <input
                type="text"
                id="search"
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
            <table className="data-table">
              <thead>{renderTableHeaders()}</thead>
              <tbody>{renderTableBody()}</tbody>
            </table>
          </div>
          <div className="table-pagination">
            <div className="showing-entries-info">
              Showing {startEntry} to {endEntry} of {filteredData.length}{" "}
              entries
            </div>
            <div className="pagination-buttons">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {" "}
                Previous
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => handlePageChange(number + 1)}
                  className={currentPage === number + 1 ? "active-page" : ""}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next{" "}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <ViewMembersModal
        isOpen={isViewModalOpen}
        onClose={() => setViewModalOpen(false)}
        group={selectedGroup}
      />
      <ModifyGroupModal
        isOpen={isModifyModalOpen}
        onClose={() => setModifyModalOpen(false)}
        group={selectedGroup}
      />
    </>
  );
};

export default TeamGroup;
