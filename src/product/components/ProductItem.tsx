import React from 'react';
import {
  Card,
  Grid,
  CardContent,
  Typography,
  CardMedia,
  GridSize,
  Divider,Link
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ProductItem as ProductType } from '../../admin/products/product-types';
import { CURRENCY } from '../../constants';
import { addGeolocationData } from '../../geolocation/geolocation-actions';

const useStyles = makeStyles(() =>
  createStyles({
    productName: {
      textTransform:'uppercase',
      fontWeight:500,
      height:45
    },
  }),
);

interface ProductItemProps{
  cols: GridSize | boolean;
  product?: ProductType;
}

export const ProductItem: React.FC<ProductItemProps> = (
  { cols, product }
) => {
  const classes = useStyles();
  let image = product.product_files.find((i)=>{
    return i.principal === true;
  });

  if (!image){
    image = product.product_files.length ? product.product_files[0]: null;
  }

  const productCurrency = CURRENCY.find((curr) => {
    return curr.key === product?.currency;
  });

  return (
    <Grid item xs={cols}>
      <Link href={`/products/${product.category.slug}/${product.slug}`} onClick={()=>addGeolocationData(product.id)}>
        <Card elevation={0} style={{ cursor:'pointer' }}>
          <CardMedia
            component='img'
            image={
              image && image?.file_url? `http://localhost:8000/${image.file_url}` : 'https://picsum.photos/250/250'
            }
            alt={image.file_name}
            style={{ height:272 }}
          />
          <Divider/>
          <CardContent>
            <Typography variant='subtitle2' className={classes.productName}>{product.name}</Typography>
            <Typography variant='caption'>{`${product?.price} ${productCurrency?.label}`}</Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};