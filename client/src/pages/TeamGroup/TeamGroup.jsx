import React, { useState, useEffect, useCallback } from "react";
import { MdEdit, MdDelete, MdRemoveRedEye, MdClose } from "react-icons/md";
import { teamGroupService } from "../../services/teamGroupService"; // Ensure this path is correct
import "./TeamGroup.css";

// Helper to get user/company info
const getAuthInfo = () => ({
  logUserId: "TestUser", // Replace with real logged-in user ID
  cmpId: "1", // Replace with real company ID
});

// ====================================================================
// --- MODAL COMPONENTS ---
// ====================================================================
const ModifyGroupModal = ({ isOpen, onClose, group, onSave }) => {
  const [members, setMembers] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  useEffect(() => {
    if (isOpen && group?.TeamGroup_HdrID) {
      teamGroupService
        .fetchAllEmployees()
        .then((res) => setAllEmployees(res.data))
        .catch((err) => console.error("Failed to fetch employees:", err));
      const initialMembers =
        group.members?.map((m) => ({
          id: m.TeamGroup_DtlID,
          name: m.EmployeeName,
          isNew: false,
        })) || [];
      initialMembers.push({ id: Date.now(), name: "", isNew: true });
      setMembers(initialMembers);
    } else {
      setMembers([]);
      setAllEmployees([]);
    }
  }, [isOpen, group]);
  if (!isOpen || !group?.TeamGroup_HdrID) return null;
  const handleMemberChange = (id, newName) =>
    setMembers(members.map((m) => (m.id === id ? { ...m, name: newName } : m)));
  const handleAddRow = () =>
    setMembers([...members, { id: Date.now(), name: "", isNew: true }]);
  const handleRemoveRow = (id) => {
    if (members.length > 1) setMembers(members.filter((m) => m.id !== id));
  };
  const handleSave = () => {
    const newEmployeeIds = members
      .filter((m) => m.isNew && m.name)
      .map((m) => m.name);
    if (newEmployeeIds.length > 0) {
      onSave(group.TeamGroup_HdrID, newEmployeeIds);
    } else {
      onClose();
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Modify {group?.GroupName}</h2>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="required">Group Name</label>
            <input type="text" value={group?.GroupName || ""} disabled />
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
                            <select
                              value={member.name}
                              onChange={(e) =>
                                handleMemberChange(member.id, e.target.value)
                              }
                            >
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
          <button className="button-primary-modal" onClick={handleSave}>
            Save
          </button>
          <button className="button-secondary-modal" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewMembersModal = ({ isOpen, onClose, group }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMembers = useCallback(async (hdrId) => {
    setLoading(true);
    try {
      const res = await teamGroupService.fetchDetails({
        TeamGroup_HdrID: hdrId,
        Status: "A",
      });
      setMembers(
        Array.isArray(res.data?.TeamGroupDtl_ListResult?.T_TrnTeamGroup_Dtl)
          ? res.data.TeamGroupDtl_ListResult.T_TrnTeamGroup_Dtl
          : []
      );
    } catch (error) {
      console.error("Failed to fetch members:", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && group?.TeamGroup_HdrID) {
      fetchMembers(group.TeamGroup_HdrID);
    } else {
      setMembers([]);
    }
  }, [isOpen, group, fetchMembers]);

  if (!isOpen || !group?.TeamGroup_HdrID) {
    return null;
  }

  const handleDeleteMember = async (dtlId) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
        await teamGroupService.discontinueEmployee({
          ...getAuthInfo(),
          TeamGroup_DtlID: dtlId,
        });
        fetchMembers(group.TeamGroup_HdrID);
      } catch (error) {
        alert("Failed to delete member.");
        console.error(error);
      }
    }
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
          {loading ? (
            <p>Loading members...</p>
          ) : (
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
                    <tr key={member.TeamGroup_DtlID}>
                      <td>{index + 1}</td>
                      <td>{member.EmployeeName}</td>
                      <td className="view-member-action-cell">
                        <button
                          className="view-member-delete-button"
                          title="Delete Member"
                          onClick={() =>
                            handleDeleteMember(member.TeamGroup_DtlID)
                          }
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-members-text">
                      No active members in this group.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const AddGroupModal = ({ isOpen, onClose, onSave }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([{ id: 1, name: "" }]);
  const [allEmployees, setAllEmployees] = useState([]);
  useEffect(() => {
    if (isOpen) {
      setGroupName("");
      setMembers([{ id: 1, name: "" }]);
      teamGroupService
        .fetchAllEmployees()
        .then((res) => setAllEmployees(res.data))
        .catch((err) => console.error("Failed to fetch employees:", err));
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const handleAddRow = () =>
    setMembers([...members, { id: Date.now(), name: "" }]);
  const handleRemoveRow = (id) => {
    if (members.length > 1) setMembers(members.filter((m) => m.id !== id));
  };
  const handleMemberChange = (id, newName) =>
    setMembers(members.map((m) => (m.id === id ? { ...m, name: newName } : m)));
  const handleSave = () => {
    if (!groupName.trim()) {
      alert("Group Name is required.");
      return;
    }
    const employeeIds = members.filter((m) => m.name).map((m) => m.name);
    onSave(groupName, employeeIds);
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
            <input
              type="text"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
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
                          <select
                            value={member.name}
                            onChange={(e) =>
                              handleMemberChange(member.id, e.target.value)
                            }
                          >
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
          <button className="button-primary-modal" onClick={handleSave}>
            Save
          </button>
          <button className="button-secondary-modal" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// --- MAIN PARENT COMPONENT ---
// ====================================================================
const TeamGroup = () => {
  const [groups, setGroups] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isModifyModalOpen, setModifyModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [error, setError] = useState(null);

  // Reset modal state on mount to prevent accidental opening
  useEffect(() => {
    setViewModalOpen(false);
    setSelectedGroup(null);
  }, []);

  // Debug state changes for isViewModalOpen
  useEffect(() => {
    console.log("isViewModalOpen:", isViewModalOpen, "selectedGroup:", selectedGroup);
  }, [isViewModalOpen, selectedGroup]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { cmpId } = getAuthInfo();
      const params = {
        Status: activeTab === "active" ? "A" : "D",
        CMPID: cmpId,
        GroupName: searchTerm || "%",
        TeamGroup_HdrID: "%",
      };
      const res = await teamGroupService.fetchHeaders(params);
      const result = res.data?.TeamGroup_Hdr_ListResult;
      setGroups(
        Array.isArray(result?.T_MstTeamGroup_Hdr)
          ? result.T_MstTeamGroup_Hdr
          : []
      );
    } catch (err) {
      setError("Failed to fetch team groups. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- CRUD HANDLERS ---
  const handleCreateGroup = async (groupName, teamEmployeeIds) => {
    try {
      await teamGroupService.create({
        ...getAuthInfo(),
        groupName,
        teamEmployeeIds,
      });
      setAddModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Failed to create group.");
      console.error(error);
    }
  };

  const handleModifyGroup = async (teamGroupHdrId, teamEmployeeIds) => {
    try {
      await teamGroupService.modify({
        ...getAuthInfo(),
        teamGroupHdrId,
        teamEmployeeIds,
      });
      setModifyModalOpen(false);
      fetchData();
    } catch (error) {
      alert("Failed to add new members.");
      console.error(error);
    }
  };

  const handleDeleteGroup = async (hdrId) => {
    if (window.confirm("Are you sure you want to discontinue this group?")) {
      try {
        await teamGroupService.discontinue({
          ...getAuthInfo(),
          TeamGroup_HdrID: hdrId,
        });
        fetchData();
      } catch (error) {
        alert("Failed to discontinue group.");
        console.error(error);
      }
    }
  };

  // --- UI EVENT HANDLERS ---
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleViewClick = (group) => {
    console.log("View button clicked for group:", group);
    setSelectedGroup(group);
    setViewModalOpen(true);
  };

  const handleEditClick = async (group) => {
    try {
      const res = await teamGroupService.fetchDetails({
        TeamGroup_HdrID: group.TeamGroup_HdrID,
        Status: "A",
      });
      const groupWithMembers = {
        ...group,
        members: res.data?.TeamGroupDtl_ListResult?.T_TrnTeamGroup_Dtl || [],
      };
      setSelectedGroup(groupWithMembers);
      setModifyModalOpen(true);
    } catch (err) {
      alert("Could not load group details for editing.");
      console.error(err);
    }
  };

  // --- PAGINATION LOGIC ---
  const currentEntries = groups.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  const totalPages = Math.ceil(groups.length / entriesPerPage);

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
                placeholder="Search by Group Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchData()}
              />
              <button onClick={fetchData} style={{ marginLeft: "8px" }}>
                Search
              </button>
            </div>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
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
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="loading-text">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="no-data-text">
                      {error}
                    </td>
                  </tr>
                ) : currentEntries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data-text">
                      No records found
                    </td>
                  </tr>
                ) : (
                  currentEntries.map((item, index) => (
                    <tr key={item.TeamGroup_HdrID}>
                      <td>{(currentPage - 1) * entriesPerPage + index + 1}</td>
                      <td className="action-cell">
                        <button
                          className="icon-button-action view"
                          title="View"
                          onClick={() => handleViewClick(item)}
                        >
                          <MdRemoveRedEye />
                        </button>
                        <button
                          className="icon-button-action edit"
                          title="Edit"
                          onClick={() => handleEditClick(item)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="icon-button-action delete"
                          title="Discontinue"
                          onClick={() =>
                            handleDeleteGroup(item.TeamGroup_HdrID)
                          }
                        >
                          <MdDelete />
                        </button>
                      </td>
                      <td>{item.GroupName}</td>
                      <td>
                        {activeTab === "active"
                          ? item.EnteredDate
                          : item.DiscontinueDate}
                      </td>
                      <td>
                        {activeTab === "active"
                          ? item.EnteredBy
                          : item.DiscontinueBy}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="table-pagination">
            <div className="showing-entries-info">
              Showing{" "}
              {groups.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0}{" "}
              to {Math.min(currentPage * entriesPerPage, groups.length)} of{" "}
              {groups.length} entries
            </div>
            <div className="pagination-buttons">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => setCurrentPage(number + 1)}
                  className={currentPage === number + 1 ? "active-page" : ""}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleCreateGroup}
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
        onSave={handleModifyGroup}
      />
    </>
  );
};

export default TeamGroup;