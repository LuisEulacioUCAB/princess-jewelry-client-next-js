import React from 'react';
import {
  withStyles,
  makeStyles,
  IconButton,
  IconButtonProps,
} from '@material-ui/core';

export const IconButtonOutlined = withStyles({
  root: {
    borderWidth: 2,
    borderStyle: 'solid',
  },
})(IconButton);

const useStyles = makeStyles({
  iconButtonXs: {
    width: 20,
    height: 20,
    padding: 0,
    '& .MuiIconButton-label': {
      '& .MuiSvgIcon-root': {
        fontSize: '1rem',
      },
    },
  },
});

export const IconButtonOutlinedXs: React.FC<IconButtonProps> = ({
  className,
  ...props
}) => {
  const classes = useStyles();
  let defualtClasses = classes.iconButtonXs;
  if (className) defualtClasses += ` ${className}`;
  return <IconButtonOutlined className={defualtClasses} {...props} />;
};
