import React from 'react';
import Link from 'next/link';
import { Box, makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { ProductItem } from '../product-types';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    '& > a':{
      textDecoration: 'none',
      color:'#000',
      '&:hover': {
        textDecoration: 'underline',
        color: '#D7B615',
      },
    }
  },
}));

interface ProductLinkProps{
  product: ProductItem;
}

export const ProductLink: React.FC<ProductLinkProps> = ({
  product
})=>{

  const classes = useStyles();

  return (
    <Box className={classes.link}>
      <Link href={`/admin/products/${product.id}`}>
        {product.name}
      </Link>
    </Box>

  );
};