import { createAction } from '@cobuildlab/react-simple-state';
import { onShowSnackbar, onShowSnackbarError } from './snackbar-events';
import { TypeMessage } from './snackbar-models';
import { EventShowSnackbarType } from './snackbar-types';

export const showSnackbar = createAction(
  onShowSnackbar,
  onShowSnackbarError,
  async (typeMessage, message) => ({
    show: true,
    typeMessage,
    message,
  }),
);

export const showErrorSnackbar = createAction(
  onShowSnackbar,
  onShowSnackbarError,
  async (message) => ({
    show: true,
    typeMessage: TypeMessage.ERROR,
    message,
  }),
);

export const hideSnackbar = createAction(
  onShowSnackbar,
  onShowSnackbarError,
  async (state: EventShowSnackbarType) => ({
    show: false,
    typeMessage: state.typeMessage,
    message: state.message,
  }),
);
