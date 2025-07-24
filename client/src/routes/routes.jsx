// src/routes/routes.js

import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import MainLayoutWrapper from "../layouts/MainLayoutWrapper";
// REMOVED: No longer need the protected route component
// import ProtectedRoute from '../auth/ProtectedRoute';
// const CustomPageLoader = React.lazy(() => import('../components/styled/CustomPageLoader'));

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const TeamGroup = lazy(() => import("../pages/TeamGroup/TeamGroup"));
const ChangeMeetingOwner = lazy(() =>
  import("../pages/ChangeMeetingOwner/ChangeMeetingOwner")
);
const SessionMeetingAgenda = lazy(() =>
  import("../pages/SessionMeetingAgenda/SessionMeetingAgenda")
);
const AttendanceType = lazy(() =>
  import("../pages/Master/AttendanceType/AttendanceType")
);
const MemberType = lazy(() => import("../pages/Master/MemberType/MemberType"));
const MeetingReport = lazy(() =>
  import("../pages/Report/Meeting/MeetingReport")
);
const AttendanceReport = lazy(() =>
  import("../pages/Report/Attendance/AttendanceReport")
);
const AllAgenda = lazy(() =>
  import("../pages/Report/AllAgenda/AllAgenda")
);
const AgendaHistory = lazy(() =>
  import("../pages/Report/AgendaHistory/AgendaHistory")
);
const Voting = lazy(() =>
  import("../pages/Report/Voting/Voting")
);
// REMOVED: No longer need the auth redirect component
// const RedirectAuth = lazy(() => import('../auth/RedirectAuth'));

const routes = [
  // REMOVED: The entire route for auth redirection is gone.
  // {
  //   path: '/auth/redirect',
  //   ...
  // },
  {
    path: "/",
    // MODIFIED: Removed the <ProtectedRoute> wrapper.
    // Now MainLayoutWrapper is rendered directly.
    element: <MainLayoutWrapper />,
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "team-group", element: <TeamGroup /> },
      { path: "change-meeting-owner", element: <ChangeMeetingOwner /> },
      { path: "session-meeting-agenda", element: <SessionMeetingAgenda /> },
      { path: "master/attendance-type", element: <AttendanceType /> },
      { path: "master/member-type", element: <MemberType /> },
      { path: "report/meeting", element: <MeetingReport /> },
      { path: "report/attendance", element: <AttendanceReport/> },
      { path: "report/all-agenda", element: <AllAgenda/> },
      { path: "report/agenda-history", element: <AgendaHistory/> },
      { path: "report/voting", element: <Voting/> },
    ],
  },
  {
    path: "*",
    element: <div>404 Page Not Found</div>,
  },
];

export default routes;
