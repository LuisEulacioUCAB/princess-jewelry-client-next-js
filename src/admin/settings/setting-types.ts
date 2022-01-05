import { ArrayElement } from '../../../shared/utils/types';
import { SettingsQuery } from '../../gerated/types';


export type SettingListItem = ArrayElement<SettingsQuery['settings']['data']>