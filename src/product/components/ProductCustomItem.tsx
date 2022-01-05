import React from 'react';
import {
  Grid,
  Button,
  Box
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { HomeEarringItem, HomeNecklaceItem, HomeRingItem } from '../../home/home-types';
import { addGeolocationData } from '../../geolocation/geolocation-actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box:{
      position:'absolute',
      width:'100%',
      height:'100%',
      top:0,
      backgroundColor:'rgba(50,50,50,0.7)',
      padding: theme.spacing(4),
      display:'none',
      alignItems:'end',
      zIndex:20,

    },
    boxPrincipal:{
      position:'relative',
      '&:hover':{
        '& > div':{
          display:'flex',
        }
      }
    },

  })
);

interface ProductCustomItemProps{
  item: HomeRingItem | HomeEarringItem | HomeNecklaceItem

}

export const ProductCustomItem: React.FC<ProductCustomItemProps> = (
  { item },
) => {
  const classes = useStyles();
  const router = useRouter();

  let image = item.product_files.find((i)=>{
    return i.principal === true;
  });

  if (!image){
    image = item.product_files.length ? item.product_files[0]: null;
  }



  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box width={250} height={250} className={classes.boxPrincipal}>

          <img alt='product' src={image && image?.file_url? `http://localhost:8000/${image.file_url}` : 'https://picsum.photos/250/250'} width='100%' height='100%'/>
          <Box className={classes.box}>
            <Box width='100%'>
              <Button
                variant='outlined'
                fullWidth
                color='secondary'
                size='medium'
                onClick={()=> {
                  router.push(`http://localhost:3000/products/${item.category.slug}/${item.slug}`);
                  addGeolocationData(item.id);
                }}
              >
                Comprar
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>

    </Grid>
  );
};