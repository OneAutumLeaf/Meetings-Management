const staticMenuData = [
  { id: 1, label: "Dashboard", icon: "house-door-fill", path: "/dashboard" },
   { id: 2, label: "Team Group", icon: "border-all", path: "/team-group" },
   { id: 3, label: "Change Meeting Owner", icon: "person-fill", path: "/change-meeting-owner" },
   { id: 4, label: "Session Meeting Agenda", icon: "bookmark-fill", path: "/session-meeting-agenda" },
  {
    id:5,
    label: "Master",
    icon: "clipboard-fill",
    path: "/master",
    submenu: [
      {
        id: 21,
        label: "Attendance Type",
        icon: "people-fill",
        path: "/master/attendance-type",
      },
      {
        id: 22,
        label: "Member Type",
         icon: "person-circle",
        path: "/master/member-type",
      },
    ],
  },
  {
    id: 6,
    label: "Report",
    icon: "flag-fill",
    path: "/report",
    submenu: [
      {
        id: 23,
        label: "Meeting",
        icon: "chat-left-text ",
        path: "/report/meeting",
      },
      {
        id: 24,
        label: "Attendance",
        icon: "people",
        path: "/report/attendance",
      },
      {
        id: 25,
        label: "All Agenda",
        icon: "book-half",
        path: "/report/all-agenda",
      },
      {
        id: 26,
        label: "Agenda History",
        icon: "hourglass-split",
        path: "/report/agenda-history",
      },
      {
        id: 27,
        label: "Voting",
        icon: "file-person-fill",
        path: "/report/voting",
      },
    ],
  },
];

export default staticMenuData;
