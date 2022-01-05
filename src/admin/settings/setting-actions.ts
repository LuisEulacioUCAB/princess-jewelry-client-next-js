import { createAction } from '@cobuildlab/react-simple-state/lib/actions';
import {
  createSettingErrorEvent,
  createSettingEvent,
  fetchSettingErrorEvent,
  fetchSettingEvent, updateSettingErrorEvent, updateSettingEvent,
} from './setting-events';
import { client } from '../../../shared/apollo';
import {
  CreateSettingDocument,
  CreateSettingInput,
  SettingsDocument,
  UpdateSettingDocument,
  UpdateSettingInput,
} from '../../gerated/types';


export const fetchSetting = createAction(
  fetchSettingEvent,
  fetchSettingErrorEvent,
  async ()=>{
    const response = await client.query({
      query: SettingsDocument
    });
    
    const { data } = response.data.settings;
    
    return { setting: data.length ? data[0] : undefined };
  }
);

export const createSetting = createAction(
  createSettingEvent,
  createSettingErrorEvent,
  async (data: CreateSettingInput)=>{
    const response = await client.mutate({
      mutation: CreateSettingDocument,
      variables:{
        data
      }
    });

    return response.data.createSetting;
  }
);

export const updateSetting = createAction(
  updateSettingEvent,
  updateSettingErrorEvent,
  async (data: UpdateSettingInput)=>{
    const response = await client.mutate({
      mutation: UpdateSettingDocument,
      variables:{
        data
      }
    });

    return response.data.updateSetting;
  }
);