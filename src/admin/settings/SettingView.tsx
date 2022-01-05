import React from 'react';
import { useCallAction, useFetchAction } from '@cobuildlab/react-simple-state';
import { Grid, TextField, Box } from '@material-ui/core';
import { createSetting, fetchSetting, updateSetting } from './setting-actions';
import { ButtonDefault } from '../../../shared/components/buttons/ButtonDefault';
import { MainLoader } from '../../../shared/components/MainLoader';
import { showSnackbar } from '../../../shared/components/snackbar/snackbar-actions';
import { SettingListItem } from './setting-types';

export const SettingView: React.FC = () => {
  const [settingData, setSettingData]= React.useState<SettingListItem>(undefined);

  const [, loading, { refetch }] = useFetchAction(fetchSetting, [],{
    onCompleted:({ setting })=> setSettingData(setting)
  });

  const [onCallCreate, loadingCreate] = useCallAction(
    createSetting, {
      onCompleted: () => {
        refetch();
        showSnackbar(
          'success',
          'Setting created successfully!',
        );
      },
    },
  );

  const [onCallUpdate, loadingUpdate] = useCallAction(
    updateSetting, {
      onCompleted: () => {
        refetch();
        showSnackbar(
          'success',
          'Setting update successfully!',
        );
      },
    },
  );

  return (
    <>
      {
        loading ? <MainLoader /> :
          (
            <>
              <Box width='100%' height='100%'>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <TextField
                      name='IVA'
                      value={settingData?.IVA}
                      label='IVA'
                      variant='outlined'
                      color='secondary'
                      fullWidth
                      type='number'
                      InputProps={{ inputProps: { min: 0 , max: 100 } }}
                      onChange={(e)=>setSettingData({
                        ...settingData, IVA:parseFloat(e.target.value)
                      })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      value={settingData?.shipping_cost}
                      label='Shipping cost'
                      variant='outlined'
                      color='secondary'
                      fullWidth
                      name='shipping_cost'
                      type='number'
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={(e)=>setSettingData({
                        ...settingData, shipping_cost:parseFloat(e.target.value)
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent='flex-end'>
                      <Grid item>
                        <ButtonDefault
                          style={{ width:110 }}
                          isLoading={loadingUpdate || loadingCreate}
                          onClick={()=>{
                            if(settingData && settingData.id){
                              onCallUpdate({
                                id: settingData.id,
                                IVA: settingData.IVA,
                                shipping_cost: settingData.shipping_cost,
                              });
                            }else{
                              onCallCreate({
                                IVA: settingData.IVA,
                                shipping_cost: settingData.shipping_cost,
                              });
                            }
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