import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Typography,
  Box,
  BoxProps,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  ListItemIcon,
  Grid,
  // Badge,
} from '@material-ui/core';
import clsx from 'clsx';

import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  // Notifications as NotificationsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  PowerSettingsNew as SignOutIcon,
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useEvent } from '@cobuildlab/react-simple-state';
import { useRouteTitle } from '../../routes/routes-hooks';
import { fetchUserEvent } from '../../../src/admin/users/user-events';

const Row: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box {...props} display="flex" flexWrap="no-wrap" alignItems="center">
    {children}
  </Box>
);

type StylesProps = {
  drawerWidth: number;
  minDrawerWidth: number;
  widthSizeMenu: number;
};

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    appBar: {
      height: 70,
      backgroundColor: '#F7F7F7',
      boxShadow: '20px -10px 25px 7px rgba(219,219,219,0.8)',
      color: '#B2B2B2',
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up('sm')]: {
        width: ({ minDrawerWidth }) => `calc(100% - ${minDrawerWidth + 10}px)`,
        marginLeft: (props) => props.drawerWidth,
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      [theme.breakpoints.up('md')]: {
        marginLeft: (props) => props.drawerWidth,
        width: ({ drawerWidth }) => `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    toolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      margin: 0,
      marginLeft: theme.spacing(1),
    },
    userText: {
      height: '100%',
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: '0 15px',
    },
    username: {
      color: theme.palette.common.black,
    },
    badge: () => {
      const size = 15;
      return {
        '& .MuiBadge-badge': {
          minWidth: size,
          width: size,
          height: size,
          maxHeight: size,
          fontSize: 10,
          top: 5,
          right: 2,
        },
      };
    },
    userMenu: {
      '& .MuiList-root ': {
        paddingBottom: 0,
        paddingTop: 0,
      },
    },
    menuItem: ({ widthSizeMenu }) => ({
      width: widthSizeMenu,
      height: 47,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '& .MuiListItemIcon-root': {
          color: theme.palette.common.white,
        },
      },
    }),
  }),
);

interface TopbarAdministratorProps {
  openDrawer: boolean;
  drawerWidth: number;
  minDrawerWidth: number;
  toggleDrawer: () => void;
}

export const TopbarAdministrator: React.FC<TopbarAdministratorProps> = ({
  drawerWidth,
  minDrawerWidth,
  openDrawer,
  toggleDrawer,
}) => {
  const [widthSizeMenu, setWidthSizeMenu] = useState(0);
  const classes = useStyles({ drawerWidth, minDrawerWidth, widthSizeMenu });
  const router = useRouter();
  const { logout } = useAuth0();
  const title = useRouteTitle();
  const user =useEvent(fetchUserEvent);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setWidthSizeMenu(ref?.current?.clientWidth || 0);
  }, [ref]);


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget);

  const handleCloseUserMenu = (): void => setAnchorEl(null);

  const handleLogout = (): void =>
    logout({
      returnTo: window.location.origin,
    });

  const TopbarMenu = (
    <Menu
      className={classes.userMenu}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      getContentAnchorEl={null}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={openUserMenu}
      onClose={handleCloseUserMenu}
    >
      <MenuItem
        onClick={() => {
          router.push('/settings/profile');
          handleCloseUserMenu();
        }}
        className={classes.menuItem}
      >
        <ListItemIcon>
          <Avatar
            style={{ width: 24, height: 24 }}
          />
        </ListItemIcon>
        <Typography variant="inherit">Profile</Typography>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleLogout}>
        <ListItemIcon>
          <SignOutIcon />
        </ListItemIcon>
        <Typography variant="inherit">Sign Out</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      color="inherit"
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: openDrawer,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <Row>
          <IconButton onClick={toggleDrawer} color="inherit">
            {openDrawer ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography className={classes.title}>{title}</Typography>
        </Row>
        <Row>
          <IconButton>
            {/* <Badge className={classes.badge} color="primary" badgeContent="+2">
              <NotificationsIcon />
            </Badge> */}
          </IconButton>
          <Divider
            style={{ margin: '0 15px' }}
            orientation="vertical"
            flexItem
          />
          <Grid ref={ref}>
            <Row>
              <Avatar  />
              <Box className={classes.userText}>
                <Typography className={classes.username}>
                  {
                    user?.last_name || user?.first_name ? (
                      `${user?.first_name} ${user?.last_name}`
                    ): user?.email
                  }
                </Typography>
                <Typography variant="caption" style={{ textTransform: 'capitalize' }}>{user?.role}</Typography>
              </Box>
              <IconButton onClick={handleOpenUserMenu}>
                <ArrowDropDownIcon />
              </IconButton>
              {TopbarMenu}
            </Row>
          </Grid>
        </Row>
      </Toolbar>
    </AppBar>
  );
};
