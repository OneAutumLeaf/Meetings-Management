import React, { useState } from 'react';
import { MdAdd, MdClose, MdAddCircle, MdDelete } from 'react-icons/md';
import './SessionMeetingAgenda.css';

const SessionMeetingAgenda = () => {
  // State for controlling the modal's visibility
  const [isModalOpen, setModalOpen] = useState(false);

  // State for managing the dynamic list of MOM points inside the modal
  const [momPoints, setMomPoints] = useState([
    { id: 1, sortOrder: 1, text: '' },
    { id: 2, sortOrder: 2, text: '' },
  ]);

  // Handler to open the modal and reset points to default
  const handleOpenModal = () => {
    setMomPoints([
      { id: 1, sortOrder: 1, text: '' },
      { id: 2, sortOrder: 2, text: '' },
    ]);
    setModalOpen(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to add a new MOM point
  const handleAddPoint = () => {
    const newId = momPoints.length > 0 ? Math.max(...momPoints.map(p => p.id)) + 1 : 1;
    const newSortOrder = momPoints.length > 0 ? Math.max(...momPoints.map(p => p.sortOrder)) + 1 : 1;
    setMomPoints([...momPoints, { id: newId, sortOrder: newSortOrder, text: '' }]);
  };

  // Function to remove a MOM point by its id
  const handleRemovePoint = (idToRemove) => {
    if (momPoints.length > 1) {
      setMomPoints(momPoints.filter(p => p.id !== idToRemove));
    }
  };

  // Main component render
  return (
    <div className="session-meeting-agenda-page-wrapper">
      {/* --- Main Page Content --- */}
      <div className="session-meeting-agenda-container">
        <h2 className="session-meeting-agenda-header">Session Meeting Agenda</h2>
        {/* ... (rest of the main page content is unchanged) ... */}
        <div className="session-meeting-agenda-filter-section">
          <div className="session-meeting-agenda-filter-controls-left">
            <div className="session-meeting-agenda-form-group">
              <label htmlFor="agenda-type">Agenda Meeting Type</label>
              <div className="session-meeting-agenda-select-wrapper">
                <select id="agenda-type" defaultValue="">
                  <option value="" disabled hidden>Search.....</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>
            </div>
            <button className="session-meeting-agenda-btn session-meeting-agenda-btn-filter">Filter</button>
          </div>
          <div className="session-meeting-agenda-filter-controls-right">
            <button
              className="session-meeting-agenda-btn session-meeting-agenda-btn-new-agenda"
              onClick={handleOpenModal}
            >
              <MdAdd size={20} />
              New Session Meeting Agenda
            </button>
          </div>
        </div>

        <div className="session-meeting-agenda-table-controls">
           <div className="session-meeting-agenda-show-entries">
            <label htmlFor="entries">Show</label>
            <select id="entries" defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>
          <div className="session-meeting-agenda-search-records">
            <label htmlFor="search">Search:</label>
            <input id="search" type="text" placeholder="Search records" />
          </div>
        </div>

        <div className="session-meeting-agenda-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Action</th>
                <th>Agenda Meeting Type</th>
                <th>Site Code Required</th>
                <th>No of Agenda</th>
                <th>Created By</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="session-meeting-agenda-loading-cell">
                  Loading !....
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="session-meeting-agenda-table-footer">
          <div className="session-meeting-agenda-entries-info">
            Showing 0 to 0 of 0 entries
          </div>
          <div className="session-meeting-agenda-pagination">
            <button disabled> Previous</button>
            <button disabled>Next </button>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="agenda-modal-overlay" onClick={handleCloseModal}>
          <div className="agenda-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="agenda-modal-header">
              <h2>Session Meeting Agenda</h2>
              <button onClick={handleCloseModal} className="agenda-modal-close-btn">
                <MdClose size={24} />
              </button>
            </div>

            <div className="agenda-modal-body">
              <div className="agenda-modal-form-row">
                <div className="agenda-modal-form-group">
                  <label htmlFor="meeting-type" className="required">Agenda Meeting Type</label>
                  <input id="meeting-type" type="text" defaultValue="Discussion" />
                </div>
                <div className="agenda-modal-form-group">
                  <label htmlFor="site-code" className="required">Site Code Required</label>
                  <div className="agenda-modal-select-wrapper">
                    <select id="site-code" defaultValue="yes">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="agenda-modal-mom-section">
                <div className="agenda-modal-mom-header">
                  <h3>MOM Points</h3>
                  <button className="agenda-modal-mom-add-btn" onClick={handleAddPoint}>
                    <MdAddCircle size={22} />
                  </button>
                </div>
                {/* This wrapper will now handle scrolling */}
                <div className="agenda-modal-mom-table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Sorting Number</th>
                        <th>MOM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {momPoints.map((point) => (
                        <tr key={point.id}>
                          <td className="agenda-modal-mom-actions">
                            <MdAddCircle size={22} className="action-icon add" onClick={handleAddPoint} />
                            <MdDelete size={22} className="action-icon delete" onClick={() => handleRemovePoint(point.id)} />
                          </td>
                          <td><input type="number" defaultValue={point.sortOrder} /></td>
                          <td><input type="text" placeholder="Enter Points" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER - Updated */}
            <div className="agenda-modal-footer">
              {/* The range input has been removed. */}
              <div className="agenda-modal-buttons">
                <button className="agenda-modal-btn-save">Save</button>
                <button className="agenda-modal-btn-cancel" onClick={handleCloseModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionMeetingAgenda;