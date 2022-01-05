import { withStyles, Card } from '@material-ui/core';

export const CardBox = withStyles(() => ({
  root: {
    borderRadius: 0,
    border: '0.3px solid #B2B2B2',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
}))(Card);
