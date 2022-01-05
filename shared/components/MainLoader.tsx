import React from 'react';
import { CircularProgress, Container, Box } from '@material-ui/core';

type MainLoaderProps = {
  // eslint-disable-next-line react/require-default-props
  height?: string;
  children?: React.ReactNode;
};
/**
 * @param root0 - Props.
 * @param root0.children - Children to show.
 * @param root0.height - Height of component.
 * @returns {JSX.Element} - Main loader component.
 */
export function MainLoader({ height, children }: MainLoaderProps): JSX.Element {
  return (
    <Container>
      <Box
        height={height || '100vh'}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {children}
        <CircularProgress size="5rem" color='secondary'/>
      </Box>
    </Container>
  );
}

type LoaderProps = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
};

/**
 * @param root0 - Props.
 * @param root0.children - Children to show.
 * @returns {JSX.Element} - Main loader component.
 */
export function Loader({ children }: LoaderProps): JSX.Element {
  return (
    <Container>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {children}
        <CircularProgress size="4rem" />
      </Box>
    </Container>
  );
}
