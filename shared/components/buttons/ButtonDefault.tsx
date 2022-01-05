import React from 'react';
import { CircularProgress, Box, ButtonProps, Button } from '@material-ui/core';

interface ButtonDefaultProps extends ButtonProps {
  isLoading?: boolean | undefined;
}

const Loading: React.FC = () => (
  <Box marginRight={2} display="flex" alignItems="center">
    <CircularProgress size={18} />
  </Box>
);

export const ButtonDefault: React.FC<ButtonDefaultProps> = ({
  children,
  size = 'large',
  variant = 'contained',
  isLoading,
  disabled,
  ...rest
}) => (
  <Button
    disabled={isLoading || disabled}
    disableElevation
    variant={variant}
    color="primary"
    {...rest}
    size={size}
  >
    {isLoading && <Loading />}
    {children}
  </Button>
);
