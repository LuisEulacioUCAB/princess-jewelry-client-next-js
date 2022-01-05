import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Theme,
  Divider,
  Container,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useCallAction, useEvent, useFetchAction } from '@cobuildlab/react-simple-state';
import { addProductInStorage, fetchHomeProduct, fetchHomeProducts, selectedProductImage } from '../home/home-actions';
import { MainLoader } from '../../shared/components/MainLoader';
import { CURRENCY } from '../constants';
import { onSelectedProductImage } from '../home/home-events';
import { ProductItem } from '../admin/products/product-types';
import { ButtonDefault } from '../../shared/components/buttons/ButtonDefault';
import { addGeolocationData } from '../geolocation/geolocation-actions';
import { ProductItem as ProductItemView } from './components/ProductItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: theme.spacing(6),
      paddingTop: theme.spacing(6),
    },
    title: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    price: {
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    stock: {
      borderRadius: 0,
      '&> div': {
        borderRadius: 0,
      },
      width: 80,
      height: 40,
    },
    buttonBg: {
      background: 'linear-gradient(90deg, rgba(205,171,104,1) 0%, rgba(218,198,114,1) 35%, rgba(255,255,201,1) 100%)',
    },
    description: {
      textTransform: 'capitalize',
      textAlign: 'justify',
    },
    coupon:{
      border:'1px solid black',
      padding: theme.spacing(2)
    },
    descriptionTitle:{
      fontWeight:500,
      textDecoration:'underline'
    }
  }),
);

export const ProductDetailsView: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { slug  } = router.query;
  const { productFile: selectedProductFile } = useEvent(onSelectedProductImage);
  const [loadingAddProduct, setLoadingAddProduct] = useState<boolean>(false);
  const [{ product }, loading ] = useFetchAction(fetchHomeProduct, [slug], {
    onCompleted: (data) => {
      if (!data) return;
      const productFiles = data.product?.product_files;
      if (productFiles?.length) selectedProductImage(productFiles[0]);
    },
  });

  const [{ products } ] = useFetchAction(fetchHomeProducts, [1,8,product && product.category ? parseInt(product.category.id) : 0 ,'']);

  const [onCallAddProduct]= useCallAction(addProductInStorage,{
    onCompleted:()=>setLoadingAddProduct(false),
    onError:(error)=>console.log('err', error)
  });

  const onClickAddProduct = (item: ProductItem): void =>{
    setLoadingAddProduct(true);
    setTimeout(()=>{
      onCallAddProduct(item);
    },3000);
  };


  const productCurrency = CURRENCY.find((curr) => {
    return curr.key === product?.currency;
  });

  return (
    <Container className={classes.container}>
      {
        loading && !product ? <MainLoader /> : (
          <>
            <Grid
              container
              spacing={3}
              justifyContent='center'
            >
              <Grid item xs={1}>
                <Box width='100%' height={500}>
                  {
                    product?.product_files.map((file) => {
                      return (
                        <Box
                          onClick={() => selectedProductImage(file)}
                        >
                          <img
                            width='100%'
                            src={`http://localhost:8000/${file?.file_url}`}
                            alt={file?.file_name}
                            style={{
                              border: file?.id === selectedProductFile?.id ? '2px solid #D7B615' : 'none',
                              cursor: 'pointer',
                              marginBottom: 15,
                            }}
                            height={80}
                          />
                        </Box>
                      );
                    })
                  }
                </Box>
              </Grid>
              <Grid item xs={6}>
                <img src={`http://localhost:8000/${selectedProductFile?.file_url}`} alt='product' width='100%'
                  height='100%' />
              </Grid>

              <Grid item xs={5}>
                <Box pl={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant='h5' className={classes.title}>{product?.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography 
                        variant='subtitle1'
                        className={classes.price}>{`${product?.price} ${productCurrency?.label}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonDefault
                        isLoading={ loadingAddProduct }
                        variant='contained'
                        size='large'
                        color='secondary'
                        fullWidth
                        onClick={()=>onClickAddProduct(product)}
                      > Agregar al carrito
                      </ButtonDefault>
                    </Grid>
                  </Grid>
                  <Box mt={3} mb={2}>
                    <Divider />
                  </Box>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='subtitle1' className={classes.descriptionTitle}>
                        DETALLES DEL PRODUCTO
                      </Typography>

                      <Typography variant='body1' className={classes.description}>
                        {product?.description}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box mt={2} mb={2}>
                    <Divider />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Grid
                container
                spacing={2}
              >
                <Grid item xs={12}>
                  <Typography variant='h5'>PRODUCTOS RELACIONADOS</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={6}
                  >
                    {
                      products?.map((i) => {
                        return <ProductItemView cols={3} product={i} />;
                      })
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </>
        )
      }
    </Container>
  );
};