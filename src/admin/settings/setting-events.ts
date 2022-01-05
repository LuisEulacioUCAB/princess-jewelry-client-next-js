import { createEvent } from '@cobuildlab/react-simple-state';
import { SettingListItem } from './setting-types';
import { CreateSettingMutation, UpdateProductMutation, UpdateSettingMutation } from '../../gerated/types';

export const fetchSettingEvent = createEvent<{ setting: SettingListItem | undefined }>({
  initialValue:{
    setting: undefined
  }
});

export const fetchSettingErrorEvent = createEvent<Error>();

export const createSettingErrorEvent = createEvent<Error>();

export const createSettingEvent = createEvent<CreateSettingMutation['createSetting'] | undefined>(
  {
    initialValue: undefined
  }
);

export const updateSettingErrorEvent = createEvent<Error>();

export const updateSettingEvent = createEvent<UpdateSettingMutation['updateSetting'] | undefined>(
  {
    initialValue: undefined
  }
);