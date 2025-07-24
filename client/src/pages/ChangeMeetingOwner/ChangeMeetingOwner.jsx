import React, { useState, useMemo } from 'react';
import { MdEdit, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import './ChangeMeetingOwner.css';

// --- MOCK DATA (to simulate a backend response) ---
const historyData = [
    { id: 1, meetingType: 'Test For Meeting Live', owner: 'SUJIT KUMAR SHAW (0100006577)', createdBy: 'SUJIT KUMAR SHAW (0100006577)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'SUJIT KUMAR SHAW (0100006577)', modifiedDate: '01 Jan 2023 12:00 AM' },
    { id: 2, meetingType: 'BRANCH MEETING', owner: 'Md Washim Hassan (0100072874)', createdBy: 'Md Washim Hassan (0100072874)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'Md Washim Hassan (0100072874)', modifiedDate: '01 Jan 2023 12:00 AM' },
    { id: 3, meetingType: 'OKR Meeting', owner: 'SHYAMAL NATH (0100003025)', createdBy: 'SHYAMAL NATH (0100003025)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'SHYAMAL NATH (0100003025)', modifiedDate: '01 Jan 2023 12:00 AM' },
    { id: 4, meetingType: 'OKR Meeting', owner: 'DEBAJIT CHOUDHURY (0100030933)', createdBy: 'DEBAJIT CHOUDHURY (0100030933)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'DEBAJIT CHOUDHURY (0100030933)', modifiedDate: '01 Jan 2023 12:00 AM' },
    { id: 5, meetingType: 'OKR Meeting', owner: 'PRABIR ROY (0100042491)', createdBy: 'PRABIR ROY (0100042491)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'PRABIR ROY (0100042491)', modifiedDate: '01 Jan 2023 12:00 AM' },
    { id: 6, meetingType: 'OKR Meeting', owner: 'SAYANI CHATTERJEE (0100105366)', createdBy: 'SAYANI CHATTERJEE (0100105366)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'SAYANI CHATTERJEE (0100105366)', modifiedDate: '01 Jan 2023 12:00 AM' },
    { id: 7, meetingType: 'SASA', owner: 'PRITAM CHATTERJEE (0100000067)', createdBy: 'PRITAM CHATTERJEE (0100000067)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'PRITAM CHATTERJEE (0100000067)', modifiedDate: '01 Jan 2023 12:00 AM' },
    { id: 8, meetingType: 'NIS Corporate Weekly Meeting', owner: 'MONISHA PANIGRAHI (0100062991)', createdBy: 'MONISHA PANIGRAHI (0100062991)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'MONISHA PANIGRAHI (0100062991)', modifiedDate: '01 Jan 2023 12:00 AM' },
    { id: 9, meetingType: 'NIS Corporate Weekly Meeting', owner: 'SAYANI CHATTERJEE (0100105366)', createdBy: 'SAYANI CHATTERJEE (0100105366)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'SREEPURNA CHAKRABORTY (0100089658)', modifiedDate: '29 Mar 2024 04:33 PM' },
    { id: 10, meetingType: 'EPC Meeting', owner: 'MONISHA PANIGRAHI (0100062991)', createdBy: 'MONISHA PANIGRAHI (0100062991)', dateCreated: '01 Jan 2023 12:00 AM', modifiedBy: 'MONISHA PANIGRAHI (0100062991)', modifiedDate: '01 Jan 2023 12:00 AM' },
    // Add more mock data to test pagination
    ...Array.from({ length: 50 }, (_, i) => ({ id: 11 + i, meetingType: `Another Meeting ${i+1}`, owner: `Employee ${i+1} (0200000${i})`, createdBy: `Admin User (00000001)`, dateCreated: '15 Feb 2024 10:00 AM', modifiedBy: `Admin User (00000001)`, modifiedDate: '16 Feb 2024 11:00 AM' }))
];

const activeData = [ // Separate data for the 'Active' tab
    { id: 1, meetingType: 'Q3 Brainstorming', owner: 'ALEX JOHNSON (0100011111)', createdBy: 'SYSTEM ADMIN', dateCreated: '10 Jul 2024 09:00 AM' },
    { id: 2, meetingType: 'Project Phoenix Kickoff', owner: 'SAMANTHA BEE (0100022222)', createdBy: 'SYSTEM ADMIN', dateCreated: '11 Jul 2024 11:30 AM' },
    // Add more active items if needed
];


const ChangeMeetingOwner = () => {
    const [activeTab, setActiveTab] = useState('History'); // 'Active' or 'History'
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    
    const dataToDisplay = activeTab === 'Active' ? activeData : historyData;

    const filteredData = useMemo(() => {
        if (!searchTerm) return dataToDisplay;
        return dataToDisplay.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, dataToDisplay]);

    // Pagination Logic
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="co-container">
            <h2 className="co-title">Meeting Type Change Owner</h2>
            
            {/* Tabs */}
            <div className="co-tabs">
                <button 
                    className={`co-tab-button ${activeTab === 'Active' ? 'active' : 'inactive'}`}
                    onClick={() => { setActiveTab('Active'); setCurrentPage(1); }}
                >
                    Active
                </button>
                <button 
                    className={`co-tab-button ${activeTab === 'History' ? 'active' : 'inactive'}`}
                    onClick={() => { setActiveTab('History'); setCurrentPage(1); }}
                >
                    History
                </button>
            </div>

            {/* Filters */}
            <div className="co-filters">
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

            {/* Table Controls */}
            <div className="co-table-controls">
                <div className="co-show-entries">
                    <span>Show</span>
                    <select 
                        className="co-select-entries"
                        value={entriesPerPage}
                        onChange={e => {
                            setEntriesPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page
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
                        onChange={e => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page
                        }}
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="co-table-wrapper">
                <table className="co-table">
                    <thead>
                        <tr>
                            <th>SL. No.</th>
                            {activeTab === 'Active' && <th>Action</th>}
                            <th>Meeting Type</th>
                            <th>Owner</th>
                            <th>Created By</th>
                            <th>Date Created</th>
                            {activeTab === 'History' && <th>Modified By</th>}
                            {activeTab === 'History' && <th>Modified Date</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.map((item, index) => (
                            <tr key={item.id}>
                                <td>{indexOfFirstEntry + index + 1}</td>
                                {activeTab === 'Active' && (
                                    <td>
                                        <button className="co-action-btn">
                                            <MdEdit />
                                        </button>
                                    </td>
                                )}
                                <td>{item.meetingType}</td>
                                <td>{item.owner}</td>
                                <td>{item.createdBy}</td>
                                <td>{item.dateCreated}</td>
                                {activeTab === 'History' && <td>{item.modifiedBy}</td>}
                                {activeTab === 'History' && <td>{item.modifiedDate}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination and Info */}
            <div className="co-pagination-wrapper">
                <div className="co-table-info">
                    Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="co-pagination">
                    <button 
                        className="co-page-item" 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        <MdKeyboardArrowLeft /> Previous
                    </button>
                    {/* Simplified pagination numbers for brevity */}
                    {[...Array(totalPages).keys()].map(number => (
                        <button 
                            key={number + 1}
                            className={`co-page-item ${currentPage === number + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(number + 1)}
                        >
                            {number + 1}
                        </button>
                    ))}
                     <button 
                        className="co-page-item" 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        Next <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeMeetingOwner;