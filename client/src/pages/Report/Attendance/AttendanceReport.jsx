import React from 'react';
import { MdCalendarToday, MdPersonOutline } from 'react-icons/md';
import './AttendanceReport.css'; // Import the CSS file

const AttendanceReport = () => {
  return (
    <div className="attendance-report-container">
      <div className="attendance-report-header">
        <h1>Reports</h1>
        <button className="attendance-report-go-back-btn">Go Back</button>
      </div>

      <div className="attendance-report-body">
        {/* --- Filter Section --- */}
        <div className="attendance-report-filter-row">
          <div className="attendance-report-form-group">
            <label htmlFor="displayType">
              Display Type <span className="attendance-report-required">*</span>
            </label>
            <div className="attendance-report-select-wrapper">
              <select id="displayType">
                <option>Summary</option>
              </select>
            </div>
          </div>

          <div className="attendance-report-form-group">
            <label htmlFor="fromDate">
              From Date <span className="attendance-report-required">*</span>
            </label>
            <div className="attendance-report-input-with-icon">
              <MdCalendarToday className="attendance-report-input-icon" />
              <input type="text" id="fromDate" defaultValue="12 Jul 2025" />
            </div>
          </div>

          <div className="attendance-report-form-group">
            <label htmlFor="toDate">
              To Date <span className="attendance-report-required">*</span>
            </label>
            <div className="attendance-report-input-with-icon">
              <MdCalendarToday className="attendance-report-input-icon" />
              <input type="text" id="toDate" defaultValue="16 Jul 2025" />
            </div>
          </div>

          <div className="attendance-report-form-group">
            <label htmlFor="attendee">Attendee</label>
            <div className="attendance-report-input-with-icon">
              <MdPersonOutline className="attendance-report-input-icon" />
              <input type="text" id="attendee" placeholder="Enter..." />
            </div>
          </div>

          <div className="attendance-report-form-group">
            <label htmlFor="meetingSubject">Meeting Subject</label>
            <input
              type="text"
              id="meetingSubject"
              placeholder="Search Subject..."
            />
          </div>

          <button className="attendance-report-filter-btn">Filter</button>
        </div>

        {/* --- Table Controls --- */}
        <div className="attendance-report-table-controls">
          <div className="attendance-report-show-entries">
            <span>Show</span>
            <div className="attendance-report-select-wrapper">
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <span>entries</span>
          </div>
          <div className="attendance-report-actions">
            <button className="attendance-report-excel-btn">Excel</button>
            <div className="attendance-report-search">
              <label htmlFor="search">Search:</label>
              <input type="text" id="search" placeholder="Search records" />
            </div>
          </div>
        </div>

        {/* --- Data Table --- */}
        <div className="attendance-report-table-wrapper">
          <table className="attendance-report-table">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Name of Members</th>
                <th>No of Meeting</th>
                <th>No of Attendance</th>
                <th>Attendance(%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="attendance-report-no-data">
                  No Data Found !....
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- Table Footer / Pagination --- */}
        <div className="attendance-report-table-footer">
          <div className="attendance-report-pagination-info">
            Showing 0 to 0 of 0 entries
          </div>
          <div className="attendance-report-pagination-controls">
            <button disabled> Previous</button>
            <button disabled>Next </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;