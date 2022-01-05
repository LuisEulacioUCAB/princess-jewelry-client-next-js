import React from 'react';
import { LayoutAdministrator } from '../../../shared/layout/LayoutAdministrator';
import { UsersListView } from '../../../src/admin/users/UsersListView';

const Users: React.FC = ()=>{
  return <LayoutAdministrator>
    <UsersListView/>
  </LayoutAdministrator>;
};

export default Users;