import { withStyles, Button } from '@material-ui/core';

export const ButtonRed = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))(Button);
