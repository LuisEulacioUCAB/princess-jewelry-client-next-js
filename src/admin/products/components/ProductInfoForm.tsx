import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { ProductItem } from '../product-types';
import { CURRENCY } from '../../../constants';

interface ProductInfoFormProps{
  product: ProductItem;
}

export const ProductInfoForm: React.FC<ProductInfoFormProps> = ({
  product
})=>{

  const productCurrency = CURRENCY.find((curr)=> {
    return curr.key === product?.currency;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant='outlined'
          color='secondary'
          InputProps={{
            readOnly: true,
          }}
          label='Name'
          value={product?.name}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant='outlined'
          color='secondary'
          InputProps={{
            readOnly: true,
          }}
          label='Category'
          value={product?.category.name}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          InputProps={{
            readOnly: true,
          }}
          label='Description'
          value={product?.description}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          variant='outlined'
          color='secondary'
          InputProps={{
            readOnly: true,
          }}
          label='Price'
          value={product?.price}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          variant='outlined'
          color='secondary'
          InputProps={{
            readOnly: true,
          }}
          label='Currency'
          value={productCurrency?.label}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          variant='outlined'
          color='secondary'
          InputProps={{
            readOnly: true,
          }}
          label='Stock'
          value={product?.stock}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};