import React, { useState } from "react";
import { MdCalendarMonth, MdSearch, MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./Voting.css"; // The new CSS file for this component

const Voting= () => {
  // State to manage the selected name for the filter
  const [meetingHeldBy, setMeetingHeldBy] = useState("SUJIT KUMAR SHAW-0100006577");

  return (
    <div className="voting-container">
      {/* --- Header --- */}
      <div className="voting-header">
        <h1 className="voting-title">Voting Report</h1>
        <button className="voting-back-button">Go Back</button>
      </div>

      {/* --- Filter Section --- */}
      <div className="voting-filters-card">
        <div className="voting-form-row">
          <div className="voting-form-group">
            <label>From Date</label>
            <div className="voting-input-with-icon">
              <MdCalendarMonth className="voting-input-icon" />
              <input type="text" defaultValue="21 Jul 2022" />
            </div>
          </div>
          <div className="voting-form-group">
            <label>To Date</label>
            <div className="voting-input-with-icon">
              <MdCalendarMonth className="voting-input-icon" />
              <input type="text" defaultValue="22 Jul 2025" />
            </div>
          </div>
          <div className="voting-form-group">
            <label>Meeting Held By</label>
            <div className="voting-custom-select">
              <span>{meetingHeldBy}</span>
              <button
                className="voting-clear-button"
                onClick={() => setMeetingHeldBy("")}
                aria-label="Clear selection"
              >
                <MdClose size={16} />
              </button>
            </div>
          </div>
          <div className="voting-form-group-action">
             <button className="voting-filter-button">Filter</button>
          </div>
        </div>
      </div>


      {/* --- Table Section --- */}
      <div className="voting-table-card">
         <div className="voting-table-controls">
           <div className="voting-show-entries">
             <span>Show</span>
             <select>
               <option>10</option>
               <option>25</option>
               <option>50</option>
             </select>
             <span>entries</span>
           </div>
           <div className="voting-search-bar">
             <label htmlFor="voting-search">Search:</label>
             <input id="voting-search" type="text" placeholder="Search records"/>
           </div>
         </div>

         <div className="voting-table-container">
            <table>
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Meeting Voting ID</th>
                  <th>Meeting Type</th>
                  <th>Meeting ID</th>
                  <th>Subject</th>
                  <th>Agenda</th>
                  <th>DateofMeeting</th>
                  <th>Meeting Start</th>
                  <th>Meeting End</th>
                  <th>Points</th>
                  <th>Person Vote for Yes</th>
                  <th>Person Vote for No</th>
                  <th>Person Vote for Neutral</th>
                  <th>Meeting Held By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="14" className="voting-no-data">
                    No Data Found !...
                  </td>
                </tr>
              </tbody>
            </table>
         </div>

        <div className="voting-pagination">
          <span>Showing 0 to 0 of 0 entries</span>
          <div className="voting-pagination-buttons">
            <button disabled><MdChevronLeft/> Previous</button>
            <button disabled>Next <MdChevronRight/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;