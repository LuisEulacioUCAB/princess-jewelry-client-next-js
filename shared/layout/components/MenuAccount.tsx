import React from 'react';
import { Menu, MenuItem, ListItemIcon, Avatar, Typography, IconButton, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import {
  PowerSettingsNew as SignOutIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Home as HomeIcon
} from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({

    menuItem:{
      height: 47,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '& .MuiListItemIcon-root': {
          color: theme.palette.common.white,
        },
      },
    },
    userMenu: () => ({
      '& .MuiList-root ': {
        paddingBottom: 0,
        paddingTop: 0
      },
      '& > .MuiMenu-paper':{
        top:'48px!important',
        left:'-webkit-calc(100% - 215px)!important',
      },
    }),
  }),
);

export const MenuAccount: React.FC = ()=>{
  const route = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleCloseUserMenu = (): void => setAnchorEl(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget);
  const openUserMenu = Boolean(anchorEl);
  const classes = useStyles();


  return(
    <>
      <IconButton onClick={handleOpenUserMenu} size='small'>
        <ArrowDropDownIcon fontSize='small' />
      </IconButton>
      <Menu
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
        className={classes.userMenu}
      >
        <MenuItem
          onClick={() => {
            route.push('/settings/account');
            handleCloseUserMenu();
          }}
          className={classes.menuItem}
        >
          <ListItemIcon>
            <Avatar
              style={{ width: 24, height: 24 }}
            />
          </ListItemIcon>
          <Typography variant='inherit'>My Account</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            route.push('/admin/dashboard');
          }}
          className={classes.menuItem}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Typography variant='inherit'>Dashboard</Typography>
        </MenuItem>

        <MenuItem onClick={()=>route.push('/api/auth/logout')}
          className={classes.menuItem}
        >
          <ListItemIcon>
            <SignOutIcon />
          </ListItemIcon>
          <Typography variant='inherit'>Sign Out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};