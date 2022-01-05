import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Box,
} from '@material-ui/core';
import { SidebarAdministrator } from './components/SidebarAdministrator';
import { TopbarAdministrator } from './components/TopbarAdministrator';

const drawerWidth = 220;
const minDrawerWidth = 88;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: theme.palette.background.default,
      height: '100vh',
    },
    content: {
      flexGrow: 1,
      padding: `${theme.spacing(3)}px ${theme.spacing(5)}px`,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);


export const LayoutAdministrator = ({
  children,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();

  const toggleDrawer = (): void => setOpenDrawer((prevState) => !prevState);

  return (
    <div className={classes.root}>
      <TopbarAdministrator
        openDrawer={openDrawer}
        drawerWidth={drawerWidth}
        minDrawerWidth={minDrawerWidth}
        toggleDrawer={toggleDrawer}
      />
      <SidebarAdministrator
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        drawerWidth={drawerWidth}
        minDrawerWidth={minDrawerWidth}
      />
      <main className={classes.content}>
        <Toolbar />
        <Box flexGrow={1}>{children}</Box>
      </main>
    </div>
  );
};
