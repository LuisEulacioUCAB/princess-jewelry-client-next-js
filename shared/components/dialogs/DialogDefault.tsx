import React from 'react';
// import styled from 'styled-components';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle, Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ZoomTransition } from '../transitions';
import { ButtonDefault } from '../buttons/ButtonDefault';

type DialogDefaultProps = {
  showDialogButtons?: boolean;
  buttonSubmitText?: string;
  buttonCancelText?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  loading?: boolean;
  headerActions?: JSX.Element;
} & DialogProps;

const useStyles = makeStyles((theme) => ({
  content: {
    position: 'relative',
    borderBottom: 'none',
    paddingTop:theme.spacing(3),
    paddingBottom:theme.spacing(3),
  },
  loader: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.65)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  actions: {
    padding: theme.spacing(2),
  },
}));

/**
 * Default dialog box; for displaying forms, messages with confirmations, informational text, etc.
 *
 * @param {DialogProps} props - Props of Dialog default.
 * @param {() => void} props.onClose - Callback fired when the component requests to be closed.
 * @param {boolean} props.open - If `true`, the Dialog is open.
 * @returns {JSX.Element | null} - Default Dialog component.
 */
export const DialogDefault: React.FC<DialogDefaultProps> = (props) => {
  const {
    children,
    onClose,
    open,
    title,
    showDialogButtons,
    buttonSubmitText,
    buttonCancelText,
    onCancel,
    onSubmit,
    loading,
    headerActions,
    ...rest
  } = props;

  const { content, loader, actions } = useStyles();

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (onClose) onClose(event, reason);
        if (onCancel) onCancel();
        // if (onClose && reason !== 'backdropClick') {
        //   onClose(event, reason);
        // }
      }}
      {...rest}
      TransitionComponent={ZoomTransition}
    >
      {title ? (
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography>{title}</Typography>
            {headerActions && <Box marginLeft={2}>{headerActions}</Box>}
          </Box>
        </DialogTitle>
      ) : null}
      <DialogContent className={content} dividers>
        {children}
      </DialogContent>
      <Divider/>
      {showDialogButtons && (
        <DialogActions className={actions}>
          <Button onClick={onCancel} variant="outlined" color="secondary" size='large'>
            {buttonCancelText || 'cancel'}
          </Button>
          <ButtonDefault onClick={onSubmit} color="primary" variant='contained' isLoading={loading}>
            {buttonSubmitText || 'submit'}
          </ButtonDefault>
        </DialogActions>
      )}
    </Dialog>
  );
};

DialogDefault.defaultProps = {
  showDialogButtons: false,
};
