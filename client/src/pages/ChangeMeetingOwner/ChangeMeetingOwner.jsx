import React, { useState, useMemo } from "react";
import {
  MdEdit
} from "react-icons/md";
import "./ChangeMeetingOwner.css";

// --- MOCK DATA (to simulate a backend response) ---
const historyData = [
  {
    id: 1,
    meetingType: "Test For Meeting Live",
    owner: "SUJIT KUMAR SHAW (0100006577)",
    createdBy: "SUJIT KUMAR SHAW (0100006577)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "SUJIT KUMAR SHAW (0100006577)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 2,
    meetingType: "BRANCH MEETING",
    owner: "Md Washim Hassan (0100072874)",
    createdBy: "Md Washim Hassan (0100072874)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "Md Washim Hassan (0100072874)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 3,
    meetingType: "OKR Meeting",
    owner: "SHYAMAL NATH (0100003025)",
    createdBy: "SHYAMAL NATH (0100003025)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "SHYAMAL NATH (0100003025)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 4,
    meetingType: "OKR Meeting",
    owner: "DEBAJIT CHOUDHURY (0100030933)",
    createdBy: "DEBAJIT CHOUDHURY (0100030933)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "DEBAJIT CHOUDHURY (0100030933)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 5,
    meetingType: "OKR Meeting",
    owner: "PRABIR ROY (0100042491)",
    createdBy: "PRABIR ROY (0100042491)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "PRABIR ROY (0100042491)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 6,
    meetingType: "OKR Meeting",
    owner: "SAYANI CHATTERJEE (0100105366)",
    createdBy: "SAYANI CHATTERJEE (0100105366)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "SAYANI CHATTERJEE (0100105366)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 7,
    meetingType: "SASA",
    owner: "PRITAM CHATTERJEE (0100000067)",
    createdBy: "PRITAM CHATTERJEE (0100000067)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "PRITAM CHATTERJEE (0100000067)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 8,
    meetingType: "NIS Corporate Weekly Meeting",
    owner: "MONISHA PANIGRAHI (0100062991)",
    createdBy: "MONISHA PANIGRAHI (0100062991)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "MONISHA PANIGRAHI (0100062991)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 9,
    meetingType: "NIS Corporate Weekly Meeting",
    owner: "SAYANI CHATTERJEE (0100105366)",
    createdBy: "SAYANI CHATTERJEE (0100105366)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "SREEPURNA CHAKRABORTY (0100089658)",
    modifiedDate: "05 Apr 2024 03:28 PM",
  },
  {
    id: 10,
    meetingType: "EPC Meeting",
    owner: "MONISHA PANIGRAHI (0100062991)",
    createdBy: "MONISHA PANIGRAHI (0100062991)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "MONISHA PANIGRAHI (0100062991)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  ...Array.from({ length: 322 }, (_, i) => ({
    id: 11 + i,
    meetingType: `Another Meeting ${i + 1}`,
    owner: `Employee ${i + 1} (0200000${i})`,
    createdBy: `Admin User (00000001)`,
    dateCreated: "15 Feb 2024 10:00 AM",
    modifiedBy: `Admin User (00000001)`,
    modifiedDate: "16 Feb 2024 11:00 AM",
  })),
];

const activeData = [
  {
    id: 1,
    meetingType: "Test For Meeting Live",
    owner: "SUJIT KUMAR SHAW (0100006577)",
    createdBy: "SUJIT KUMAR SHAW (0100006577)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "SUJIT KUMAR SHAW (0100006577)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 2,
    meetingType: "BRANCH MEETING",
    owner: "Md Washim Hassan (0100072874)",
    createdBy: "Md Washim Hassan (0100072874)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "Md Washim Hassan (0100072874)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 3,
    meetingType: "OKR Meeting",
    owner: "SHYAMAL NATH (0100003025)",
    createdBy: "SHYAMAL NATH (0100003025)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "SHYAMAL NATH (0100003025)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 4,
    meetingType: "OKR Meeting",
    owner: "DEBAJIT CHOUDHURY (0100030933)",
    createdBy: "DEBAJIT CHOUDHURY (0100030933)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "DEBAJIT CHOUDHURY (0100030933)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 5,
    meetingType: "OKR Meeting",
    owner: "PRABIR ROY (0100042491)",
    createdBy: "PRABIR ROY (0100042491)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "PRABIR ROY (0100042491)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 6,
    meetingType: "OKR Meeting",
    owner: "SAYANI CHATTERJEE (0100105366)",
    createdBy: "SAYANI CHATTERJEE (0100105366)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "SAYANI CHATTERJEE (0100105366)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 7,
    meetingType: "SASA",
    owner: "PRITAM CHATTERJEE (0100000067)",
    createdBy: "PRITAM CHATTERJEE (0100000067)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "PRITAM CHATTERJEE (0100000067)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 8,
    meetingType: "NIS Corporate Weekly Meeting",
    owner: "MONISHA PANIGRAHI (0100062991)",
    createdBy: "MONISHA PANIGRAHI (0100062991)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "MONISHA PANIGRAHI (0100062991)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
  {
    id: 9,
    meetingType: "NIS Corporate Weekly Meeting",
    owner: "SAYANI CHATTERJEE (0100105366)",
    createdBy: "SAYANI CHATTERJEE (0100105366)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "SREEPURNA CHAKRABORTY (0100089658)",
    modifiedDate: "05 Apr 2024 03:28 PM",
  },
  {
    id: 10,
    meetingType: "EPC Meeting",
    owner: "MONISHA PANIGRAHI (0100062991)",
    createdBy: "MONISHA PANIGRAHI (0100062991)",
    dateCreated: "01 Jan 2023 12:00 AM",
    modifiedBy: "MONISHA PANIGRAHI (0100062991)",
    modifiedDate: "01 Jan 2023 12:00 AM",
  },
];

// --- Reusable Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationGroup = () => {
    const pages = [];
    const neighbours = 1;
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > neighbours + 2) pages.push("...");
      for (
        let i = Math.max(2, currentPage - neighbours);
        i <= Math.min(totalPages - 1, currentPage + neighbours);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - neighbours - 1) pages.push("...");
      pages.push(totalPages);
    }
    return [...new Set(pages)];
  };
  const pages = getPaginationGroup();
  if (totalPages === 0) return null;
  return (
    <div className="co-pagination">
      <button
        className="co-page-nav"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="co-page-numbers">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="co-page-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`co-page-number ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        className="co-page-nav"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

const ChangeMeetingOwner = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const dataToDisplay = activeTab === "Active" ? activeData : historyData;

  const filteredData = useMemo(() => {
    if (!searchTerm) return dataToDisplay;
    return dataToDisplay.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, dataToDisplay]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="co-container">
      <h2 className="co-title">Meeting Type Change Owner</h2>

      <div className="co-tabs">
        <button
          className={`co-tab-button ${
            activeTab === "Active" ? "active" : "inactive"
          }`}
          onClick={() => {
            setActiveTab("Active");
            setCurrentPage(1);
          }}
        >
          Active
        </button>
        <button
          className={`co-tab-button ${
            activeTab === "History" ? "active" : "inactive"
          }`}
          onClick={() => {
            setActiveTab("History");
            setCurrentPage(1);
          }}
        >
          History
        </button>
      </div>

      <div className="co-control-bar">
        <div className="co-form-group">
          <label>Meeting Type</label>
          <select className="co-select">
            <option>Search....</option>
          </select>
        </div>
        <div className="co-form-group">
          <label>Owner Employee</label>
          <select className="co-select">
            <option>Search....</option>
          </select>
        </div>
        <div className="co-filter-buttons">
          <button className="co-btn co-btn-primary">Filter</button>
          <button className="co-btn co-btn-secondary">Cancel</button>
        </div>
      </div>

      <div className="co-table-controls">
        <div className="co-show-entries">
          <span>Show</span>
          <select
            className="co-select-entries"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>
        <div className="co-search">
          <label htmlFor="search-records">Search:</label>
          <input
            id="search-records"
            type="text"
            placeholder="Search records"
            className="co-input"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="co-table-wrapper">
        <table className="co-table">
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Action</th>
              <th>Meeting Type</th>
              <th>Owner</th>
              <th>Created By</th>
              <th>Date Created</th>
              <th>Modified By</th>
              <th>Modified Date</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length > 0 ? (
              currentEntries.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstEntry + index + 1}</td>
                  <td className="co-action-cell">
                    <button className="co-action-btn">
                      <MdEdit />
                    </button>
                  </td>
                  <td>{item.meetingType}</td>
                  <td>{item.owner}</td>
                  <td>{item.createdBy}</td>
                  <td>{item.dateCreated}</td>
                  <td>{item.modifiedBy}</td>
                  <td>{item.modifiedDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="co-no-records-cell">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="co-pagination-wrapper">
        <div className="co-table-info">
          Showing {filteredData.length > 0 ? indexOfFirstEntry + 1 : 0} to{" "}
          {Math.min(indexOfLastEntry, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ChangeMeetingOwner;
