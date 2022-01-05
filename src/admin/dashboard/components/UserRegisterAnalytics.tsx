import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { useFetchAction } from '@cobuildlab/react-simple-state';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { DATETIME } from '../../../constants';
import { fetchUserRegisterAnalytics } from '../../users/user-actions';
import { MainLoader } from '../../../../shared/components/MainLoader';

export const UserRegisterAnalytics: React.FC = ()=>{

  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const [{
    data ,
    startDate,
    endDate,
    categories
  }, isLoading] = useFetchAction(fetchUserRegisterAnalytics,[selectedPeriod]);

  const options = {
    title:{
      text:'Usuatios Registrados'
    },
    subtitle:{
      text: `Desde: ${startDate} Hasta: ${endDate}`
    },
    yAxis: {
      title: {
        text: 'Usuarios'
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
      name:'Usuario',
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


  return(
    <Card elevation={0}>
      <CardHeader
        title={
          <Typography variant="h6">Usuarios</Typography>
        }
        action={
          <FormControl fullWidth variant="outlined" style={{ width:200 }}>
            <InputLabel id="demo-multiple-currency-label" color='secondary'>
              Periodo
            </InputLabel>
            <Select
              labelId="demo-multiple-weekday-label"
              id="demo-multiple-weekday"
              value={selectedPeriod}
              label="Periodo"
              onChange={(e)=>setSelectedPeriod(e.target.value as string)}
              color='secondary'
            >
              {DATETIME.map((curr) => (
                <MenuItem value={curr.key}>
                  {curr.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />
      <CardContent>
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
      </CardContent>
    </Card>
  );
};