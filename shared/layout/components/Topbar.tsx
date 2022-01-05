import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MailOutlined as Mail,
  PhoneOutlined as Phone  } from '@material-ui/icons';
import {
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { ROUTES } from '../../routes/routes-utils';
import { MenuAccount } from './MenuAccount';
import { MenuCart } from './MenuCart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list:{
      display:'flex',
      padding:0
    },
    listItem:{
      minWidth: 30
    },
    toolbarPrincipal:{
      minHeight:0,
      padding:0
    },
    signAction:{
      width:220,
      paddingTop: 2,
      paddingBottom: 2,
    },
    toolbarLogo:{
      textAlign:'center',
      justifyContent:'center',
      backgroundColor:'#fff'
    },
    menuRoot: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    navButton: {
      flexGrow: 1,
      fontSize: 14,
      borderRadius: 'initial',
      color:'#FFF',
      '&:hover': {
        opacity: '0.8',
      },
    },
    toolbarMenu:{
      backgroundColor:'#8E785F'
    },
  }),
);



export const Topbar: React.FC = () => {
  const classes = useStyles();
  const { user } = useUser();
  const selectedRouteStyle = { borderBottom: 'solid' };
  const router = useRouter();
  const path = router?.pathname;

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar className={classes.toolbarPrincipal}>

          <Box width='100%' display='flex' justifyContent='space-between'>
            <Box>
              <List component="ul" className={classes.list}>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <Mail fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>princessjewelry.nv@gmail.com</Typography>
                  } />
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <Phone fontSize='small'/>
                  </ListItemIcon>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>+58 888 888 888</Typography>
                  } />
                </ListItem>
              </List>
            </Box>
            <Box>
              <List component="ul" className={classes.list}>
                {
                  !user && (
                    <ListItem>
                      <Button
                        className={classes.signAction}
                        variant='contained'
                        onClick={()=>router.push('/api/auth/login')}
                      >
                        Ingresar / Registrarse
                      </Button>
                    </ListItem>
                  )
                }
                <ListItem>
                  <IconButton size='small'>
                    <MenuCart/>
                  </IconButton>
                </ListItem>
                <ListItem>
                  <MenuAccount/>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Toolbar>
        <Toolbar className={classes.toolbarLogo}>
          <img src='/logo-finish.svg' alt='logo' width={300}/>
        </Toolbar>
        <Toolbar className={classes.toolbarMenu}>
          <Grid
            className={classes.menuRoot}
            container
            spacing={2}
            direction="row"
            alignItems="center">
            {
              Object.values(ROUTES).map((route)=>(
                <Grid item>
                  <Link href={route.path}>
                    <Button
                      color="inherit"
                      size="large"
                      className={classes.navButton}
                      style={path === route.path ? selectedRouteStyle : {}}>
                      {route.text}
                    </Button>
                  </Link>
                </Grid>
              ))
            }
            <Grid item>
              <Button
                variant='contained'
                size="large"
              >
                Ofertas
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};