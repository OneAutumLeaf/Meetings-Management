import React from 'react';
import { MdCalendarToday, MdClose, MdSearch } from 'react-icons/md';
import './AgendaHistory.css'; // Make sure to create this CSS file

// Mock data based on the provided image
const agendaHistoryData = [
  {
    slNo: 1,
    meetingId: 44,
    meetingDetail: '1-Daily Activities',
    meetingDate: '08 Nov 2022',
    agendaPoints: 'Agenda 1',
    agendaDetail: 'Agenda 1 - Decoded',
  },
  {
    slNo: 2,
    meetingId: 52,
    meetingDetail: '3-NIS Corporate Weekly Meeting',
    meetingDate: '12 Dec 2022',
    agendaPoints: 'Testing',
    agendaDetail: 'Testing345',
  },
  {
    slNo: 3,
    meetingId: 57,
    meetingDetail: '4-NIS Corporate Weekly Meeting',
    meetingDate: '03 Jan 2023',
    agendaPoints: 'Shortage Issue',
    agendaDetail: 'Shortage Issue For Last 7 Days In Site RNTI',
  },
  // Adding a few more for demonstration
    {
    slNo: 4,
    meetingId: 57,
    meetingDetail: '4-NIS Corporate Weekly Meeting',
    meetingDate: '03 Jan 2023',
    agendaPoints: 'Post Vacant Issue',
    agendaDetail: 'Post Vaccant For Last 3 Days',
  },
  {
    slNo: 5,
    meetingId: 57,
    meetingDetail: '4-NIS Corporate Weekly Meeting',
    meetingDate: '03 Jan 2023',
    agendaPoints: 'Disciplinary Issue',
    agendaDetail: 'Disciplinary Issue In Site',
  },
];


const AgendaHistory = () => {
  return (
    <div className="agenda-history-container">
      <div className="agenda-history-header">
        <button className="agenda-history-go-back-btn">Go Back</button>
      </div>

      <div className="agenda-history-card">
        {/* --- FILTERS SECTION --- */}
        <div className="agenda-history-filters">
          <div className="agenda-history-form-row">
            <div className="agenda-history-form-group">
              <label>From Date *</label>
              <div className="agenda-history-input-with-icon">
                <MdCalendarToday className="agenda-history-input-icon" />
                <input type="text" defaultValue="21 Apr 2025" />
              </div>
            </div>
            <div className="agenda-history-form-group">
              <label>To Date *</label>
              <div className="agenda-history-input-with-icon">
                <MdCalendarToday className="agenda-history-input-icon" />
                <input type="text" defaultValue="22 Jul 2025" />
              </div>
            </div>
            <div className="agenda-history-form-group">
              <label>Meeting Type</label>
              <div className="agenda-history-select-wrapper">
                <select defaultValue="General">
                  <option>General</option>
                  <option>Board Meeting</option>
                  <option>Committee Meeting</option>
                </select>
              </div>
            </div>
            <div className="agenda-history-form-group">
                <label>Meeting Owner</label>
                <div className="agenda-history-tag-input">
                    <span>Bipul Sutradhar(0100080033)</span>
                    <button className="agenda-history-tag-close-btn"><MdClose size={14} /></button>
                </div>
            </div>
          </div>

          <div className="agenda-history-form-row">
             <div className="agenda-history-form-group">
                <label>Meeting</label>
                <div className="agenda-history-tag-input">
                    <span>3 - Accounts Module Development-04</span>
                    <button className="agenda-history-tag-close-btn"><MdClose size={14} /></button>
                </div>
            </div>
             <div className="agenda-history-form-group">
              <label>Agenda</label>
              <div className="agenda-history-select-wrapper">
                <select>
                  <option value="">Search here..</option>
                  <option>Agenda 1</option>
                  <option>Testing</option>
                </select>
              </div>
            </div>
            <div className="agenda-history-form-group agenda-history-filter-button-group">
                 <button className="agenda-history-filter-btn">Filter</button>
            </div>
          </div>
        </div>
        
        {/* --- TABLE SECTION --- */}
        <div className="agenda-history-table-section">
          <div className="agenda-history-table-controls">
            <div className="agenda-history-table-actions">
                <div className="agenda-history-show-entries">
                    <label>Show</label>
                    <select defaultValue="10">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <label>entries</label>
                </div>
                <button className="agenda-history-excel-btn">Excel</button>
            </div>
            <div className="agenda-history-search-wrapper">
                <label>Search:</label>
                <input type="search" placeholder="Search records"/>
            </div>
          </div>

          <div className="agenda-history-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Meeting ID</th>
                  <th>Meeting Detail</th>
                  <th>Meeting Date</th>
                  <th>Agenda Points</th>
                  <th>Agenda Detail</th>
                </tr>
              </thead>
              <tbody>
                {agendaHistoryData.map((item) => (
                  <tr key={item.slNo}>
                    <td>{item.slNo}</td>
                    <td className='agenda-history-meeting-id'>{item.meetingId}</td>
                    <td>{item.meetingDetail}</td>
                    <td>{item.meetingDate}</td>
                    <td>{item.agendaPoints}</td>
                    <td>{item.agendaDetail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="agenda-history-pagination-section">
            <div className="agenda-history-pagination-info">
              Showing 1 to {agendaHistoryData.length} of {agendaHistoryData.length} entries
            </div>
            <div className="agenda-history-pagination-controls">
              <button disabled>‹ Previous</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>5</button>
              <button>Next ›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaHistory;