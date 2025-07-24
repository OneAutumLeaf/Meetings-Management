import React from 'react';
import { MdCalendarToday, MdClose } from 'react-icons/md';
import './AllAgenda.css'; // We will create this CSS file next

const AllAgenda = () => {
  // Array of table headers based on the combined image parts
  const tableHeaders = [
    "SL No.",
    "Meeting Type",
    "Agenda Points",
    "Agenda Detail",
    "Agenda Point Status",
    "Agenda First Occur Ref.",
    "Agenda First Occur Ref. Detail",
    "Agenda First Taken Up",
    "Agenda Last Occur Ref.",
    "Agenda Last Occur Ref. Detail",
    "Agenda Last Taken Up",
    "Target Closure Date",
    "Next Review Date",
    "Actual Closure Date",
    "Raised By"
  ];

  return (
    <div className="all-agenda-page">
      <div className="all-agenda-header">
        <h1 className="all-agenda-title">All Agenda</h1>
        <button className="all-agenda-go-back-btn">Go Back</button>
      </div>

      <div className="all-agenda-filters-card">
        <div className="all-agenda-form-group">
          <label htmlFor="from-date">From Date *</label>
          <div className="all-agenda-input-wrapper">
            <MdCalendarToday className="all-agenda-input-icon" />
            <input id="from-date" type="text" defaultValue="21 Apr 2025" />
          </div>
        </div>

        <div className="all-agenda-form-group">
          <label htmlFor="to-date">To Date *</label>
          <div className="all-agenda-input-wrapper">
            <MdCalendarToday className="all-agenda-input-icon" />
            <input id="to-date" type="text" defaultValue="22 Jul 2025" />
          </div>
        </div>

        <div className="all-agenda-form-group">
          <label htmlFor="meeting-type">Meeting Type *</label>
          <div className="all-agenda-select-wrapper">
            <select id="meeting-type" defaultValue="General">
              <option>General</option>
              <option>Board</option>
              <option>Committee</option>
            </select>
          </div>
        </div>

        <div className="all-agenda-form-group">
          <label htmlFor="meeting-owner">Meeting Owner *</label>
          <div className="all-agenda-tag-input">
            <span className="all-agenda-owner-tag">
              Bipul Sutradhar(0100080033)
              <button className="all-agenda-tag-close-btn">
                <MdClose size={14} />
              </button>
            </span>
          </div>
        </div>

        <button className="all-agenda-filter-btn">Filter</button>
      </div>

      <div className="all-agenda-table-actions">
        <div className="all-agenda-show-entries">
          <span>Show</span>
          <select defaultValue="10">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>entries</span>
        </div>
        <button className="all-agenda-excel-btn">Excel</button>
        <div className="all-agenda-search-wrapper">
          <label htmlFor="search-records">Search:</label>
          <input id="search-records" type="text" placeholder="Search records" />
        </div>
      </div>

      <div className="all-agenda-table-container">
        <table className="all-agenda-table">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={tableHeaders.length} className="all-agenda-no-data">
                No Data Found !....
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="all-agenda-footer">
        <div className="all-agenda-entry-count">
          Showing 0 to 0 of 0 entries
        </div>
        <div className="all-agenda-pagination">
          <button disabled>Previous</button>
          <button disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AllAgenda;