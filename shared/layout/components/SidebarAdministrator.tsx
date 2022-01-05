import React from 'react';
import {
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ADMINISTRATOR_ROUTES } from '../../routes/routes-utils';

interface StylesProps {
  drawerWidth: number;
  minDrawerWidth: number;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) =>
  createStyles({
    drawer: {
      width: (props) => props.drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerPaper: {
      padding: '15px 10px',
      height: '100%',
      backgroundColor: theme.palette.common.black,
    },
    drawerOpen: {
      width: (props) => props.drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: (props) => props.minDrawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: (props) => props.minDrawerWidth,
      },
    },
    topLogo: {
      width: 66,
      height: 66,
      display: 'inline-block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(3),
    },
    listItem: {
      color: theme.palette.common.white,
      height: 56,
      borderRadius: 4,
      paddingLeft: 20,
      marginBottom: theme.spacing(1),
      '&.Mui-selected': {
        color: '#808080',
        backgroundColor: 'rgba(128, 128, 128, 0.64)',
        '& .MuiListItemIcon-root': {
          color: '#808080',
        },
      },
      '&:hover': {
        '&.Mui-selected': {
          color: '#808080',
          backgroundColor: 'rgba(128, 128, 128, 0.64)',
          '& .MuiListItemIcon-root': {
            color: '#808080',
          },
        },
      },
    },
    listItemIcon: {
      color: theme.palette.common.white,
      minWidth: 70,
    },
  }),
);

interface SidebarAdministratorProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
  minDrawerWidth: number;
}

export const SidebarAdministrator: React.FC<SidebarAdministratorProps> = ({
  open,
  onClose,
  drawerWidth,
  minDrawerWidth,
}) => {
  const router = useRouter();
  const { pathname } = router;
  const classes = useStyles({ drawerWidth, minDrawerWidth });

  const navItems = Object.values(ADMINISTRATOR_ROUTES).map((item) => {
    const { icon: Icon, text, } = item;
    return (
      <ListItem
        className={classes.listItem}
        selected={pathname === item.path}
        button
        onClick={() => router.push(item.path)}
      >
        <ListItemIcon className={classes.listItemIcon}>
          {Icon && <Icon />}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
  });

  const content = (
    <>
      <img className={classes.topLogo} src='/ISOTIPO.svg' alt='kpa logo' />
      <List component='nav' >{navItems}</List>
    </>
  );

  return (
    <>
      <Hidden xsDown>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.drawerPaper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <Drawer
          variant='temporary'
          anchor='left'
          open={open}
          onClose={onClose}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};