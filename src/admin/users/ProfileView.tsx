import React, { ChangeEvent } from 'react';
import { useCallAction, useFetchAction } from '@cobuildlab/react-simple-state';
import { Grid, TextField, Box , FormControl,makeStyles } from '@material-ui/core';
import { useUser } from '@auth0/nextjs-auth0';
import PhoneNumberInput from 'react-phone-number-input';
import { ButtonDefault } from '../../../shared/components/buttons/ButtonDefault';
import { MainLoader } from '../../../shared/components/MainLoader';
import { showSnackbar } from '../../../shared/components/snackbar/snackbar-actions';
import { fetchUser, updateUser } from './user-actions';
import { UserListItem } from './user-types';


const colorsTexFieldsPhone = {
  primary: '#bdbdbd',
  error: '#E57373',
};

const useStyles = makeStyles(() => ({
  phoneInput: {
    paddingLeft: 10,
    borderRadius: 4,
    height: 56,
    '& input': {
      border: 'none',
      fontSize: 16,
      '&:focus': {
        outline: 'none !important',
      },
    },
  }
}));

export const ProfileView: React.FC = () => {
  const classes = useStyles();
  const { user: userAuth0 } = useUser();
  const [userData, setUserData] = React.useState<UserListItem | undefined>(undefined);
  const [, loading, { refetch }] = useFetchAction(fetchUser, [userAuth0?.email],{
    onCompleted:(data)=>{
      // eslint-disable-next-line @typescript-eslint/naming-convention,no-unused-vars
      const { __typename, ...rest } = data;
      setUserData(rest);
    }
  });

  const [onCallUpdate, loadingUpdate] = useCallAction(
    updateUser, {
      onCompleted: () => {
        refetch();
        showSnackbar(
          'success',
          'User updated successfully!',
        );
      },
    },
  );

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void=>{
    setUserData({
      ...userData, [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {
        loading ? <MainLoader /> :
          (
            <>
              <Box width='100%' height='100%'>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name='email'
                      value={userData?.email}
                      label='Email'
                      variant='outlined'
                      color='secondary'
                      fullWidth
                      disabled
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={userData?.first_name}
                      label='First Name'
                      variant='outlined'
                      color='secondary'
                      fullWidth
                      name='first_name'
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={userData?.last_name}
                      label='Last Name'
                      variant='outlined'
                      color='secondary'
                      fullWidth
                      name='last_name'
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <PhoneNumberInput
                        name='phone'
                        style={{
                          border: `1px solid ${colorsTexFieldsPhone.primary}`,
                        }}
                        className={classes.phoneInput}
                        placeholder="Phone"
                        defaultCountry="US"
                        value={userData?.phone}
                        onChange={(value)=>{
                          setUserData({
                            ...userData, phone:value as string
                          });
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={userData?.direction}
                      label='Address'
                      variant='outlined'
                      color='secondary'
                      fullWidth
                      name='direction'
                      onChange={onChange}
                      multiline
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justifyContent='flex-end'>
                      <Grid item>
                        <ButtonDefault
                          style={{ width:110 }}
                          isLoading={loadingUpdate}
                          onClick={()=>{
                            onCallUpdate(userData);
                          }}
                        >Save</ButtonDefault>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </>
          )
      }
    </>
  );
};