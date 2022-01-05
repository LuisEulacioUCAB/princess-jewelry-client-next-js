import React  from 'react';
import {
  Container,
  Grid,
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  ListItemIcon,
  TextField,
  IconButton, FormHelperText,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MailOutlined as Mail,
  PhoneOutlined as Phone ,
  CalendarToday as Calendar,
  Facebook,
  Instagram
} from '@material-ui/icons';
import { useCallAction } from '@cobuildlab/react-simple-state';
import { useForm, Controller } from 'react-hook-form';
import { createSubscription } from '../../../src/subcription/subscription-actions';
import { ButtonDefault } from '../../components/buttons/ButtonDefault';
import validator from 'validator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box:{
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    boxTitle:{
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    box1:{
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8)
    },
    box2:{
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(12)
    },
    listItem:{
      minWidth: 30
    },
    container:{
      background:'linear-gradient(90deg, rgba(205,171,104,1) 0%, rgba(218,198,114,1) 35%, rgba(255,255,201,1) 100%)',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      backgroundImage:'url("/corona-completa.svg")',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX:'right'
    },
    principal:{
      background:'linear-gradient(90deg, rgba(241,224,214,1) 0%, rgba(255,255,255,1) 35%, rgba(241,224,214,1) 100%)',
      marginTop:theme.spacing(2)
    },
    buttonBg:{
      background:'linear-gradient(90deg, rgba(205,171,104,1) 0%, rgba(218,198,114,1) 35%, rgba(255,255,201,1) 100%)',
      margin:theme.spacing(1)
    },
    TextFieldSubscribe:{
      '&>div':{
        backgroundColor:'#FFF',
        '&>input':{
          paddingTop:12,
          paddingBottom:12,
        }
      }
    }
  })
);

export const Footer: React.FC = ()=>{
  const classes = useStyles();
  const { handleSubmit, control , reset } = useForm();
  const [error, setError] = React.useState('');
  const [onCallSubscription, loading] = useCallAction(createSubscription,{
    onCompleted:()=>reset({ 'email': '' })
  });

  const beforeSubmitValues = (values: any): void => {
    onCallSubscription(values.email);
  };

  return (
    <Box className={classes.principal}>
      <Box>
        <Container>
          <Grid
            container
            spacing={4}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Box width='100%' textAlign='center'>
                <IconButton className={classes.buttonBg}>
                  <Facebook fontSize='large'/>
                </IconButton>
                <IconButton className={classes.buttonBg}>
                  <Instagram fontSize='large'/>
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <List>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='h5'>Contacto</Typography>
                  }/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <Mail />
                  </ListItemIcon>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>princessjewelry.nv@gmail.com</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>+58 888 88 8888</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemIcon className={classes.listItem}>
                    <Calendar />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant='subtitle2'>Lunes - Viernes</Typography>
                    }
                    secondary={
                      <Typography variant='caption'>8:00 am - 5:30 pm</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={7}>
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Box width='100%' textAlign='center'>
                    <Typography variant='subtitle1'>Subscribete y obten un descuento en tu primera compra</Typography>
                  </Box>
                </Grid>
                {
                  error ? (
                    <FormHelperText error={Boolean(error)}>
                      <>{error}</>
                    </FormHelperText>
                  ): null
                }
                <Grid item xs={12}>
                  <form onSubmit={handleSubmit(beforeSubmitValues)}>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          rules={{
                            validate:(email)=>{
                              if (!email) {
                                setError('The email is required');
                                return false;
                              };
                              if(!validator.isEmail(email)) {
                                setError('The email is invalid');
                                return false;
                              };
                              return true;
                            }
                          }}
                          render={({ field: { onChange, value }   }) => (
                            <TextField
                              fullWidth
                              variant='outlined'
                              size='small'
                              color='secondary'
                              value={value}
                              onChange={onChange}
                              className={classes.TextFieldSubscribe}
                              label='Email'
                            />
                          )}
                        />

                      </Grid>
                      <Grid item xs={4}>
                        <ButtonDefault
                          variant='contained'
                          fullWidth
                          size='large'
                          isLoading={loading}
                          type='submit'
                        >Subscribirte</ButtonDefault>
                      </Grid>
                    </Grid>
                  </form>

                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Container>
      </Box>

      <Box className={classes.container}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <List>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='h5'>Lista 1</Typography>
                  }/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4}>
              <List>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='h5'>Lista 1</Typography>
                  }/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4}>
              <List>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='h5'>Lista 1</Typography>
                  }/>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={
                    <Typography variant='subtitle2'>item 1</Typography>
                  }/>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>

  );
};