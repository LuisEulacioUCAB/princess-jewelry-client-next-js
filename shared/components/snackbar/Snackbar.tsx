import React from 'react';
import { useEvent } from '@cobuildlab/react-simple-state';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { hideSnackbar } from './snackbar-actions';
import { onShowSnackbar } from './snackbar-events';

/**
 *
 * @param {AlertProps} props - Props of Alert.
 * @returns {JSX.Element} The Alert component.
 */
function Alert(props: AlertProps): JSX.Element {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Snackbar.
 *
 * @returns {JSX.Element} Snackbar component.
 */
export const Snackbar: React.FC = () => {
  const showSnackbarEvent = useEvent(onShowSnackbar);
  return (
    <MuiSnackbar
      open={showSnackbarEvent.show}
      autoHideDuration={10000}
      onClose={() => hideSnackbar(showSnackbarEvent)}
    >
      <Alert
        onClose={() => hideSnackbar(showSnackbarEvent)}
        severity={showSnackbarEvent.typeMessage}
      >
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: showSnackbarEvent.message }} />
      </Alert>
    </MuiSnackbar>
  );
};
