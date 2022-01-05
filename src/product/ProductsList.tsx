import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ProductItem } from './components/ProductItem';

interface ProductsListProps{
  title: string;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  title
}) => (
  <>
    <Grid
      container
      spacing={2}
      justifyContent='center'
    >
      <Grid item xs={12}>
        <Typography variant='h4' color='primary'>{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={6}
        >
          {
            [1, 1, 1, 1, 1, 1, 1, 1].map(() => <ProductItem cols={3} />)
          }
        </Grid>
      </Grid>

    </Grid>
  </>
);