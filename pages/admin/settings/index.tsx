import React from 'react';
import { LayoutAdministrator } from '../../../shared/layout/LayoutAdministrator';
import { LayoutSettings } from '../../../shared/layout/settings/LayoutSettings';
import { SettingView } from '../../../src/admin/settings/SettingView';

const Settings: React.FC = () =>{
  return (
    <LayoutAdministrator>
      <LayoutSettings>
        <SettingView/>
      </LayoutSettings>
    </LayoutAdministrator>
  );
};

export default Settings;
