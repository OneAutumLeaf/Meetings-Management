// src/layouts/MainLayoutWrapper.js

import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from './MainLayout';
// REMOVED: No longer need authentication context
// import { useAuth } from '../context/AuthContext'; 
const CustomPageLoader = React.lazy(() => import('../components/styled/CustomPageLoader'));

const MainLayoutWrapper = (props) => {
  // REMOVED: All auth-related hooks and logic
  // const { user, authLoading } = useAuth();

  // if (authLoading) {
  //   return <CustomPageLoader message="Verifying authentication..." />;
  // }

  // if (!user) {
  //   return <CustomPageLoader message="Verifying authentication..." />;
  // }

  // MODIFIED: The component now directly returns the layout, passing through any props.
  return (
    <Suspense fallback={<CustomPageLoader message="Loading layout..." />}>
      <MainLayout {...props}>
        <Outlet />
      </MainLayout>
    </Suspense>
  );
};

export default MainLayoutWrapper;