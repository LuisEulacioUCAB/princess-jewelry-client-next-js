import React from 'react';
import { LayoutAdministrator } from '../../../shared/layout/LayoutAdministrator';
import { DashboardView } from '../../../src/admin/dashboard/Dashboard';

const Dashboard: React.FC = ()=>{
  return <LayoutAdministrator>
    <DashboardView/>
  </LayoutAdministrator>;
};

export default Dashboard;