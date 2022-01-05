import React from 'react';
import { LayoutAdministrator } from '../../../../shared/layout/LayoutAdministrator';
import { ProfileView } from '../../../../src/admin/users/ProfileView';
import { LayoutSettings } from '../../../../shared/layout/settings/LayoutSettings';

const Users: React.FC = ()=>{
  return <LayoutAdministrator>
    <LayoutSettings>
      <ProfileView/>
    </LayoutSettings>
  </LayoutAdministrator>;
};

export default Users;