import React from "react";
import { MdCalendarToday } from "react-icons/md";
import "./MeetingReport.css"; // Import the dedicated CSS file

const MeetingReport = () => {
  return (
    <div className="meeting-report-page">
      <div className="meeting-report-container">
        {/* Header */}
        <header className="meeting-report-header">
          <h2>Meeting Report</h2>
          <button className="meeting-report-go-back-btn">Go Back</button>
        </header>

        {/* Filters */}
        <div className="meeting-report-filters">
          <div className="meeting-report-form-group">
            <label htmlFor="from-date">From Date *</label>
            <div className="meeting-report-input-wrapper">
              <MdCalendarToday className="meeting-report-input-icon" />
              <input id="from-date" type="text" defaultValue="12 Jul 2025" />
            </div>
          </div>
          <div className="meeting-report-form-group">
            <label htmlFor="to-date">To Date *</label>
            <div className="meeting-report-input-wrapper">
              <MdCalendarToday className="meeting-report-input-icon" />
              <input id="to-date" type="text" defaultValue="16 Jul 2025" />
            </div>
          </div>
          <div className="meeting-report-form-group">
            <label htmlFor="meeting-type">Meeting Type</label>
            <input
              id="meeting-type"
              type="text"
              placeholder="Search Meeting Type.."
            />
          </div>
          <div className="meeting-report-form-group">
            {/* This empty label is for alignment purposes with other inputs */}
            <label> </label>
            <button className="meeting-report-filter-btn">Filter</button>
          </div>
        </div>

        {/* Table Controls */}
        <div className="meeting-report-table-controls">
          <div className="meeting-report-show-entries">
            Show
            <select name="entries" id="entries">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            entries
          </div>
          <div className="meeting-report-search">
            <label htmlFor="search-records">Search:</label>
            <input
              id="search-records"
              type="text"
              placeholder="Search records"
            />
          </div>
        </div>

        {/* Table */}
        <div className="meeting-report-table-wrapper">
          <table className="meeting-report-table">
            <thead>
              <tr>
                <th>SL. No.</th>
                <th>Action</th>
                <th>Export</th>
                <th>Meeting ID</th>
                <th>Meeting Type</th>
                <th>Subject</th>
                <th>Location</th>
                <th>Meeting Start</th>
                <th>Meeting End</th>
                <th>No of Attendee</th>
                <th>Session/General Meeting</th>
                {/* The following columns are from the second image */}
                <th>Session Meeting Agenda</th>
                <th>Note</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="14" className="meeting-report-no-data">
                  No Data Found !....
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* Footer */}
        <footer className="meeting-report-footer">
          <div className="meeting-report-info">
            Showing 0 to 0 of 0 entries
          </div>
          <div className="meeting-report-pagination">
            <button disabled> Previous</button>
            <button disabled>Next </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MeetingReport;