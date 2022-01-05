import React , { useState } from 'react';
import { useEvent, useFetchAction } from '@cobuildlab/react-simple-state';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { DialogDefault } from '../../../../shared/components/dialogs/DialogDefault';
import { onProductGraphModal } from '../product-events';
import { closeProductGraphModal, fetchProductGraph } from '../product-actions';
import { ButtonDefault } from '../../../../shared/components/buttons/ButtonDefault';
import { DATETIME } from '../../../constants';
import { MainLoader } from '../../../../shared/components/MainLoader';




export const ProductGraphModal: React.FC = ()=>{
  const { isOpen, product } = useEvent(onProductGraphModal);
  const [selectedTime, setSelectedTime] = useState('daily');

  const [{
    data ,
    startDate,
    endDate,
    categories
  }, isLoading] = useFetchAction(fetchProductGraph,[product, selectedTime]);

  const options = {
    title: {
      text: `Visitas del producto ${product?.name}`
    },
    subtitle:{
      text: `Desde: ${startDate} Hasta: ${endDate}`
    },
    yAxis: {
      title: {
        text: 'Visitas'
      },
      allowDecimals: false
    },
    xAxis: {
      categories,
      allowDecimals: false
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
      }
    },
    series: [{
      name:'Visitas',
      data
    }],
    chart: {
      animation: {
        duration: 500,
      },
      width:550,
      height: 350,
    },
    rangeSelector: {
      enabled: false,
    },
    legend: {
      enabled: true,
    },
  };

  return (
    <DialogDefault
      open={isOpen}
      title='Cantidad de visitas'
      maxWidth='sm'
      fullWidth
    >
      <Grid container justifyContent='center'>
        <Grid item xs={12}>
          <Box mb={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-multiple-currency-label" color='secondary'>
                Periodo
              </InputLabel>
              <Select
                labelId="demo-multiple-weekday-label"
                id="demo-multiple-weekday"
                value={selectedTime}
                label="Periodo"
                onChange={(e)=>setSelectedTime(e.target.value as string)}
                color='secondary'
              >
                {DATETIME.map((curr) => (
                  <MenuItem value={curr.key}>
                    {curr.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>
        </Grid>
        <Grid item>
          {
            isLoading ? (
              <MainLoader height="350px">Loading data...</MainLoader>
            ):(
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            )
          }
        </Grid>
        <Grid item xs={12}>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <ButtonDefault
              variant="outlined"
              onClick={()=>closeProductGraphModal()}
              color='secondary'
            >
              Cancel
            </ButtonDefault>
          </Box>
        </Grid>
      </Grid>
    </DialogDefault>
  );
};