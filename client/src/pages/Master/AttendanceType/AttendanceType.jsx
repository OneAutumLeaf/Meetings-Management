import React from 'react';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import './AttendanceType.css'; // The single, updated CSS file

// --- Mock Data to populate the tables ---
// Data for the 'Active' tab
const activeData = [
  {
    slNo: 1,
    attendanceType: 'Present',
    noOfAttendance: 1.00,
    lastModifiedDate: '13 Jan 2023',
    lastModifiedBy: '0100006577-SUJIT KUMAR SHAW'
  },
  {
    slNo: 2,
    attendanceType: 'Absent',
    noOfAttendance: 0.00,
    lastModifiedDate: '13 Jan 2023',
    lastModifiedBy: '0100006577-SUJIT KUMAR SHAW'
  },
  {
    slNo: 3,
    attendanceType: 'Half Day',
    noOfAttendance: 0.50,
    lastModifiedDate: '12 Jan 2023',
    lastModifiedBy: '0100001234-JANE DOE'
  },
];

// Data for the 'Discontinue' tab
const discontinuedData = [
   {
    slNo: 1,
    attendanceType: 'Sick Leave (Old)',
    noOfAttendance: 0.00,
    discontinueDate: '10 Dec 2022',
    discontinueBy: '010000ADMIN-ADMINISTRATOR'
  }
];

// ====================================================================
// --- MODAL COMPONENT ---
// ====================================================================
const AddAttendanceTypeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Attendance Type</h2>
          <button className="modal-close-button" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="attendanceType">
              Attendance Type<span className="required-star">*</span>
            </label>
            <input
              id="attendanceType"
              type="text"
              placeholder="Enter Attendance Type"
            />
          </div>
          <div className="form-group">
            <label htmlFor="noOfAttendance">
              No of Attendance<span className="required-star">*</span>
            </label>
            <input
              id="noOfAttendance"
              type="text"
              placeholder="Enter No of attendance"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="button-save">Save</button>
          <button className="button-cancel" onClick={onClose}>
            Add New / Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// --- MAIN PAGE COMPONENT ---
// ====================================================================
const AttendanceType = () => {
  const [activeTab, setActiveTab] = React.useState('active');
  const [loading, setLoading] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [entriesPerPage, setEntriesPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal

  // Effect to switch data and show loading state when tab changes
  React.useEffect(() => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      if (activeTab === 'active') {
        setTableData(activeData);
      } else {
        setTableData(discontinuedData);
      }
      setCurrentPage(1);
      setLoading(false);
    }, 500);
  }, [activeTab]);

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return tableData;
    return tableData.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [tableData, searchTerm]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const paginatedData = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const renderTableHeaders = () => {
    if (activeTab === 'active') {
      return (
        <tr>
          <th>SL No.</th><th>Action</th><th>AttendanceType</th><th>No of Attendance</th><th>Last Modified Date</th><th>Last Modified By</th>
        </tr>
      );
    }
    return (
      <tr>
        <th>SL No.</th><th>AttendanceType</th><th>No of Attendance</th><th>Discontinue Date</th><th>Discontinue By</th>
      </tr>
    );
  };

  const renderTableBody = () => {
    if (loading) {
      return (<tr><td colSpan={6} className="status-cell">Loading !...</td></tr>);
    }
    if (paginatedData.length === 0) {
      return (<tr><td colSpan={6} className="status-cell">No records found.</td></tr>);
    }
    return paginatedData.map((item, index) => (
      activeTab === 'active' ? (
        <tr key={`active-${item.slNo}`}>
          <td>{indexOfFirstEntry + index + 1}</td>
          <td className="action-icons">
            <button className="icon-button edit-icon"><MdEdit /></button>
            <button className="icon-button delete-icon"><MdDelete /></button>
          </td>
          <td>{item.attendanceType}</td>
          <td>{item.noOfAttendance.toFixed(2)}</td>
          <td>{item.lastModifiedDate}</td>
          <td>{item.lastModifiedBy}</td>
        </tr>
      ) : (
        <tr key={`discontinued-${item.slNo}`}>
          <td>{indexOfFirstEntry + index + 1}</td>
          <td>{item.attendanceType}</td>
          <td>{item.noOfAttendance.toFixed(2)}</td>
          <td>{item.discontinueDate}</td>
          <td>{item.discontinueBy}</td>
        </tr>
      )
    ));
  };

  return (
    <div className="page-container">
      {/* The Modal is rendered here but only visible when isModalOpen is true */}
      <AddAttendanceTypeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <div className="page-header">
        <h1>Attendance Type</h1>
        {/* This button now opens the modal */}
        <button className="entry-button" onClick={() => setIsModalOpen(true)}>
          Entry
        </button>
      </div>

      <div className="content-card">
        <div className="tab-buttons">
          <button
            className={activeTab === 'active' ? 'active' : ''}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={activeTab === 'discontinue' ? 'active' : ''}
            onClick={() => setActiveTab('discontinue')}
          >
            Discontinue
          </button>
        </div>

        <div className="table-controls">
          <div className="show-entries">
            Show
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="10">10</option><option value="25">25</option><option value="50">50</option>
            </select>
            entries
          </div>
          <div className="search-container">
            <label htmlFor="search">Search:</label>
            <input
              type="text" id="search" placeholder="Search records"
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

        <div className="pagination-controls">
          <div className="pagination-info">
            Showing {filteredData.length > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="pagination-buttons">
            <button onClick={handlePrevPage} disabled={currentPage === 1}> Previous</button>
            <span className="page-number">{currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceType;