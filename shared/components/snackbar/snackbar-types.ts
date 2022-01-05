import { TypeMessage } from './snackbar-models';

export type EventShowSnackbarType = {
  show: boolean;
  typeMessage:
    | TypeMessage.INFO
    | TypeMessage.SUCCESS
    | TypeMessage.WARNING
    | TypeMessage.ERROR;
  message: string;
};
