import React from 'react';
import { Grid } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { LatestUsers } from './components/LatestUsers';
import { LatestProductsBuyer } from './components/LatestProductsBuyer';
import { UserRegisterAnalytics } from './components/UserRegisterAnalytics';

const options = {
  title: {
    text: 'Productos vendidos'
  },
  yAxis: {
    title: {
      text: 'Ventas'
    },
    allowDecimals: false
  },
  xAxis: {
    accessibility: {
      rangeDescription: 'Range: 2010 to 2012'
    },
    allowDecimals: false
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },
  series: [{
    data: [1, 2, 3,12,2,8]
  }],
  chart: {
    animation: {
      duration: 500,
    },
    width:663,
    height: 350,
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  rangeSelector: {
    enabled: false,
  }
};

const options1 = {
  title: {
    text: 'Usuarios registrados'
  },
  yAxis: {
    title: {
      text: 'Usuarios'
    }
  },
  xAxis: {
    accessibility: {
      rangeDescription: 'Range: 2010 to 2012'
    },
    allowDecimals: false
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },
  series: [{
    data: [1, 2, 3, 20,15,5]
  }],
  chart: {
    animation: {
      duration: 500,
    },
    width:663,
    height: 350,
  },
  rangeSelector: {
    enabled: false,
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  }

};

export const DashboardView: React.FC = ()=>{
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={6}>
            <UserRegisterAnalytics/>
          </Grid>
          <Grid item xs={6}>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          </Grid>
          <Grid item xs={6}>
            <LatestUsers/>
          </Grid>
          <Grid item xs={6} >
            <LatestProductsBuyer/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};