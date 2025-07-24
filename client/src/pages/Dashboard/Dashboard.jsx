import React, { useState } from "react";
import {
  MdCalendarMonth,
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdSearch,
  MdNotifications,
  MdClose,
  MdCalendarToday,
  MdAccessTime,
  MdLocationOn,
} from "react-icons/md";
import "./Dashboard.css"; // The updated CSS file

//--- MOCK DATA ---//
const meetings = [
  {
    id: 1,
    title: "Design Sync",
    time: "10:00 AM - 11:00 AM",
    startTime: "09:00",
    endTime: "11:00",
    type: "family",
    status: "accepted",
    attendees: [
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ],
  },
  {
    id: 2,
    title: "Marketing Catch-up",
    time: "01:30 PM - 02:00 PM",
    startTime: "12:00",
    endTime: "13:00",
    type: "work",
    status: "pending",
    attendees: [],
  },
  {
    id: 3,
    title: "Project Retrospective",
    time: "03:00 PM - 04:00 PM",
    startTime: "14:00",
    endTime: "16:00",
    type: "personal",
    status: "declined",
    attendees: [],
  },
];

// ====================================================================
// --- MODAL COMPONENT ---
// ====================================================================
const AddMeetingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [meetingType, setMeetingType] = useState("existing");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Meeting</h2>
          <button className="modal-close-button" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          {/* --- Row 1 --- */}
          <div className="form-row">
            <div className="form-group" style={{ flexBasis: "50%" }}>
              <label className="required">Meeting Type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="meeting-type"
                    value="existing"
                    defaultChecked
                    onChange={(e) => setMeetingType(e.target.value)}
                  />{" "}
                  Existing
                </label>
                <label>
                  <input
                    type="radio"
                    name="meeting-type"
                    value="new"
                    onChange={(e) => setMeetingType(e.target.value)}
                  />{" "}
                  New
                </label>
              </div>
              {meetingType === "existing" && (
                <div className="input-with-icon select-wrapper">
                  <select>
                    <option>Search meeting type here...</option>
                  </select>
                </div>
              )}
            </div>
            <div className="form-group" style={{ justifyContent: "flex-end" }}>
              <div className="radio-group">
                <label>
                  <input type="radio" name="session-type" value="session" />{" "}
                  Session Meeting
                </label>
                <label>
                  <input
                    type="radio"
                    name="session-type"
                    value="general"
                    defaultChecked
                  />{" "}
                  General Meeting
                </label>
              </div>
            </div>
          </div>

          {/* --- Row 2 --- */}
          <div className="form-row">
            <div className="form-group">
              <label>Meeting Date</label>
              <div className="input-with-icon">
                <MdCalendarToday className="input-icon" />
                <input type="text" defaultValue="14 Jul 2025" />
              </div>
            </div>
            <div className="form-group">
              <label>Time From</label>
              <div className="input-with-icon">
                <MdAccessTime className="input-icon" />
                <input type="text" defaultValue="09:00 PM" />
              </div>
            </div>
            <div className="form-group">
              <label className="required">Time To</label>
              <div className="input-with-icon select-wrapper">
                <MdAccessTime className="input-icon" />
                <select defaultValue="09:30 PM">
                  <option>09:30 PM</option>
                  <option>10:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* --- Row 3 --- */}
          <div className="form-row">
            <div className="form-group">
              <label className="required">Meeting Detail</label>
              <textarea placeholder="Detail..." rows="3"></textarea>
            </div>
            <div className="form-group">
              <label className="required">Subject</label>
              <textarea placeholder="Subject..." rows="3"></textarea>
            </div>
          </div>

          {/* --- Row 4 --- */}
          <div className="form-row">
            <div className="form-group">
              <label>Meeting Mode</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="meeting-mode" value="online" />{" "}
                  Online
                </label>
                <label>
                  <input
                    type="radio"
                    name="meeting-mode"
                    value="offline"
                    defaultChecked
                  />{" "}
                  Offline
                </label>
                <label>
                  <input type="radio" name="meeting-mode" value="hybrid" />{" "}
                  Hybrid
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Location</label>
              <div className="input-with-icon">
                <MdLocationOn className="input-icon" />
                <input type="text" placeholder="Location here.." />
              </div>
            </div>
          </div>

          {/* --- Row 5 --- */}
          <div className="form-group">
            <label className="required">Member Type</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Team
              </label>
              <label>
                <input type="checkbox" /> Filter
              </label>
            </div>
          </div>

          {/* --- Members Table --- */}
          <div className="members-section">
            <div className="members-header">
              <h3>Members</h3>
              <button className="add-member-button">
                <MdAdd size={20} />
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" /> Select All
                    </th>
                    <th>Attendee Type</th>
                    <th>Attendee Name</th>
                    <th>Member Type</th>
                    <th>Voting Member</th>
                    <th>Chair Man</th>
                    <th>Guest</th>
                    <th>Company</th>
                    <th>Name</th>
                    <th>Mobile No.</th>
                    <th>Email ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{/* Rows would be added dynamically */}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="button-primary">Save</button>
          <button className="button-secondary">Add New / Cancel</button>
        </div>
      </div>
    </div>
  );
};

//--- SIDEBAR SUB-COMPONENTS ---//
const MiniCalendar = () => {
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dates = [
    { day: 30, currentMonth: false },
    { day: 1, currentMonth: true },
    { day: 2, currentMonth: true },
    { day: 3, currentMonth: true },
    { day: 4, currentMonth: true },
    { day: 5, currentMonth: true },
    { day: 6, currentMonth: true },
    { day: 7, currentMonth: true },
    { day: 8, currentMonth: true },
    { day: 9, currentMonth: true, isSelected: true },
    { day: 10, currentMonth: true },
    { day: 11, currentMonth: true },
    { day: 12, currentMonth: true },
    { day: 13, currentMonth: true },
    { day: 14, currentMonth: true },
    { day: 15, currentMonth: true },
    { day: 16, currentMonth: true },
    { day: 17, currentMonth: true },
    { day: 18, currentMonth: true },
    { day: 19, currentMonth: true },
    { day: 20, currentMonth: true },
    { day: 21, currentMonth: true },
    { day: 22, currentMonth: true },
    { day: 23, currentMonth: true },
    { day: 24, currentMonth: true },
    { day: 25, currentMonth: true },
    { day: 26, currentMonth: true },
    { day: 27, currentMonth: true },
    { day: 28, currentMonth: true },
    { day: 29, currentMonth: true },
    { day: 30, currentMonth: true },
    { day: 31, currentMonth: true },
    { day: 1, currentMonth: false },
  ];
  return (
    <div className="mini-calendar">
      <div className="mini-calendar__header">
        <h2>July 2025</h2>
        <div className="mini-calendar__nav">
          <button>
            <MdChevronLeft size={20} />
          </button>
          <button>
            <MdChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="mini-calendar__grid mini-calendar__grid--days">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mini-calendar__grid mini-calendar__grid--dates">
        {dates.map((date, i) => {
          let className = "date-cell";
          if (!date.currentMonth) className += " date-cell--other-month";
          if (date.isSelected) className += " date-cell--selected";
          return (
            <span key={i} className={className}>
              {date.day}
            </span>
          );
        })}
      </div>
    </div>
  );
};

//--- MAIN CONTENT SUB-COMPONENTS ---//
const Meeting = ({ meeting }) => {
  const { title, time, attendees, status, type } = meeting;
  const cardClasses = `meeting-card ${type} ${
    status === "declined" ? "declined" : ""
  }`;
  return (
    <div className={cardClasses.trim()}>
      <div className="meeting-card__info">
        <p className="meeting-card__title">{title}</p>
        <p className="meeting-card__time">{time}</p>
      </div>
      {status === "accepted" && (
        <div className="meeting-card__attendees">
          {attendees.map((avatar, index) => (
            <img key={index} src={avatar} alt={`Attendee ${index + 1}`} />
          ))}
        </div>
      )}
      {status === "pending" && (
        <div className="meeting-card__actions">
          <button className="button button--accept">Accept</button>
          <button className="button button--decline">Decline</button>
        </div>
      )}
      {status === "declined" && (
        <p className="meeting-card__status-text">You declined this meeting.</p>
      )}
    </div>
  );
};

const ScheduleView = ({ meetings }) => {
  const timeSlots = Array.from(
    { length: 8 },
    (_, i) =>
      `${(i + 9) % 12 === 0 ? 12 : (i + 9) % 12}:00 ${
        i + 9 < 12 || i + 9 === 24 ? "AM" : "PM"
      }`
  );
  const calculateGridStyle = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const durationMinutes = (end - start) / (1000 * 60);
    const startRow = (start.getHours() - 9) * 2 + start.getMinutes() / 30 + 1;
    const span = Math.ceil(durationMinutes / 30);
    return { gridRow: `${startRow} / span ${span}` };
  };
  return (
    <div className="schedule-view">
      <div className="schedule-view__time-column">
        {timeSlots.map((time) => (
          <div key={time} className="time-slot">
            {time}
          </div>
        ))}
      </div>
      <div className="schedule-view__grid">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="grid-row"></div>
        ))}
        <div className="schedule-view__meetings-layer">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              style={calculateGridStyle(meeting.startTime, meeting.endTime)}
            >
              <Meeting meeting={meeting} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

//--- LAYOUT COMPONENTS ---//
const Sidebar = ({ onOpenModal }) => (
  <aside className="sidebar-dashboard">
    <div className="sidebar-dashboard-header">
      <div className="sidebar-dashboard-header__icon-wrapper">
        <MdCalendarMonth size={24} />
      </div>
      <h1>My Calendar</h1>
    </div>
    <button className="create-event-button" onClick={onOpenModal}>
      <MdAdd size={22} /> Create Event
    </button>
    <MiniCalendar />
  </aside>
);

const MainContent = () => (
  <main className="main-content">
    <header className="main-content__header">
      <div className="main-content__title-group">
        <h1>Wednesday, July 9</h1>
        <p>You have {meetings.length} meetings today.</p>
      </div>
      <div className="main-content__actions">
        <div className="search-bar">
          <MdSearch className="search-bar__icon" size={20} />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="icon-button">
          <MdNotifications size={24} />
        </button>
        <div className="view-toggle">
          <button>Day</button>
          <button className="view-toggle__active">Week</button>
          <button>Month</button>
        </div>
      </div>
    </header>
    <div className="main-content__body">
      <ScheduleView meetings={meetings} />
    </div>
  </main>
);

//--- THE FINAL INTEGRATED DASHBOARD ---//
const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar onOpenModal={() => setModalOpen(true)} />
      <MainContent />
      <AddMeetingModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
