import React from 'react';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import { ProductHorizontalItem } from '../../product/components/ProductHorizontalItem';
import { ProductCustomItem } from '../../product/components/ProductCustomItem';
import { HomeEarringItem, HomeNecklaceItem, HomeRingItem } from '../home-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box:{
      border:'2px solid #D7B615',
    },
  })
);

interface HomeProductsProps{
  showProductsRight?: boolean;
  principalImage?:string;
  items: HomeRingItem[] | HomeEarringItem[] | HomeNecklaceItem[],
  viewMore:string;
}

export const HomeProducts: React.FC<HomeProductsProps> = (
  { showProductsRight = false ,
    principalImage='https://picsum.photos/250/250',
    items = [],
    viewMore = ''
  }
) =>{

  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={4}
    >
      {
        showProductsRight ? (
          <>
            <Grid item xs={6}>
              <Box textAlign='center'>
                <Typography variant='h4'>Anillos</Typography>
                <Typography variant='subtitle1'>Oro - Plata</Typography>
              </Box>
              <Box textAlign='center' >
                <img alt='product' src={principalImage} width={400} height={400} className={classes.box}/>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex'>
                <Box>
                  <Grid container spacing={4}>
                    {
                      items.map((item)=><Grid item xs={6}><ProductCustomItem item={item}/></Grid>)
                    }
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box width='100%' textAlign='center'>
                <Link href={viewMore}>
                  <Button variant='contained' size='large' fullWidth>Ver mas</Button>
                </Link>
              </Box>
            </Grid>
          </>

        ):(
          <>
            <Grid item xs={6}>
              <Grid container spacing={4}>
                {
                  items.map((item)=><Grid item xs={6}><ProductCustomItem item={item}/></Grid>)
                }
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Box textAlign='center'>
                <Typography variant='h4'>Anillos</Typography>
                <Typography variant='subtitle1'>Oro - Plata</Typography>
              </Box>
              <Box textAlign='center'>
                <img alt='product' src={principalImage} width={400} height={400} className={classes.box}/>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box width='100%' textAlign='center'>
                <Link href={viewMore}>
                  <Button variant='contained' size='large' fullWidth>Ver mas</Button>
                </Link>
              </Box>
            </Grid>
          </>
        )
      }
    </Grid>
  );
};