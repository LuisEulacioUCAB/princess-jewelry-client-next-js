import React from 'react';
import { CardContent, Grid, List, ListItem,
  ListItemIcon, ListItemText ,makeStyles, Card,Typography, Divider, Box
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SETTINGS_ROUTES } from '../../routes/routes-utils';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  },
  sidebar: {
    // height: '100%',
  },
  cardContentRoot: {
    padding: '0px !important',
    height: '100%',
  },
  listRoot: {
    height: '100%',
    padding: 0,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  },
  listItem: {
    '&.Mui-selected': {
      borderLeft: '2px solid',
      color: theme.palette.secondary.main,
      '& .MuiListItemIcon-root': {
        color: theme.palette.secondary.main,
      },
    },
  },
}));

export const LayoutSettings: React.FC = ({ children }) => {

  const router = useRouter();
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <CardContent className={classes.sidebar}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1">Settings</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent
        classes={{
          root: classes.cardContentRoot,
        }}>
        <Grid container style={{ height:'100%' }}>
          <Grid item xs={2}>
            <List
              classes={{
                root: classes.listRoot,
              }}
            >
              {
                Object.values(SETTINGS_ROUTES).map((route) => {
                  const { icon: Icon, path, text } = route;
                  return (
                    <Link href={path}>
                      <ListItem
                        button
                        selected={path === router.pathname}
                        className={classes.listItem}
                      >
                        <ListItemIcon>
                          <Icon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    </Link>

                  );
                })
              }
            </List>
          </Grid>
          <Grid item xs={10}>
            <Box p={2}>
              {children}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};