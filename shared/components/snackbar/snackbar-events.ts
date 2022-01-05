import { createEvent } from '@cobuildlab/react-simple-state';
import { EventShowSnackbarType } from './snackbar-types';
import { TypeMessage } from './snackbar-models';

/**
 * Event to show Snackbar.
 *
 * @type {Event<EventShowSnackbarType>}
 */
export const onShowSnackbar = createEvent<EventShowSnackbarType>({
  initialValue: {
    show: false,
    typeMessage: TypeMessage.INFO,
    message: '',
  },
});

/**
 * Event to trigger error on failure to show snackbar.
 */
export const onShowSnackbarError = createEvent({
  reducer: () => ({ show: false, typeMessage: TypeMessage.INFO, message: '' }),
});
