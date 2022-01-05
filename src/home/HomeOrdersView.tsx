import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
  CardHeader,
  CardContent,
  CardActions, TextField, IconButton,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useCallAction, useFetchAction } from '@cobuildlab/react-simple-state';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DeleteOutlined as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import { addProductInStorage, fetchOrders, removeProductFromStorage, subsProductInStorage } from './home-actions';
import { ProductFileItem, ProductItem } from '../admin/products/product-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      height: 560,
    },
    noProducts: {
      fontWeight: 500,
    },
    title: {
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    detailsOrdersTitle: {
      fontWeight: 700,
    },
    card: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderTop: '4px solid #D7B615',
    },
    cardActions: {
      padding: theme.spacing(2),
    },
    titleMenu: {
      fontWeight: 500,
      textTransform: 'uppercase',
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
      marginBottom: theme.spacing(1),
    },
    description: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical',
      textTransform: 'capitalize',
    },
    deleteIcon: {
      position: 'relative',
      top: 4,
    },
    deleteBox: {
      '&:hover': {
        textDecoration: 'underline',
      },
      cursor: 'pointer',
    },
    iconButton:{
      '&:hover': {
        backgroundColor: 'transparent',
      },
    }
  }),
);

export const HomeOrdersView: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const [countProducts, setCountProducts] = React.useState<number>(0);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  const [{ products }, , { refetch }] = useFetchAction(fetchOrders, [], {
    onCompleted: (data) => {
      const a = data.products?.reduce((acc, { count }) => {
        return acc + count;
      }, 0);

      const tp = data.products?.reduce((acc, { count, product }) => {
        const totalByProduct = product.price * count;
        return acc + totalByProduct;
      }, 0);
      setCountProducts(a);
      setTotalPrice(tp);
    },
  });

  const [onCallAddProduct] = useCallAction(addProductInStorage);
  const [onCallRemoveProduct] = useCallAction(subsProductInStorage,{
    onCompleted: () => refetch(),
  });


  const [onCallRemove] = useCallAction(removeProductFromStorage, {
    onCompleted: () => refetch(),
  });


  const textCountProduct = countProducts > 1 ? 'productos' : 'producto';

  return (
    <Box className={classes.box}>
      <Container>
        <Grid container spacing={2}>
          {
            products.length ?
              <Grid item xs={12}>
                <Grid container spacing={6}>
                  <Grid item xs={8}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Box mt={2}>
                          <Typography variant='h5' style={{ fontWeight: 500 }}
                            className={classes.title}>{`Mis Pedidos (${countProducts} ${textCountProduct}) `} </Typography>
                        </Box>
                        <Box mb={2} mt={1}>
                          <Divider />
                        </Box>
                      </Grid>
                      {
                        products.map(({ product, count }) => {

                          let image: ProductFileItem = product?.product_files?.find((i) => {
                            return i.principal === true;
                          });

                          if (!image) {
                            image = product?.product_files?.length ? product?.product_files[0] : null;
                          }

                          return (
                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item xs={3}>
                                  <img
                                    style={{
                                      border: '2px solid #D7B615',
                                      cursor: 'pointer',
                                      marginBottom: 15,
                                    }}
                                    alt={product.name}
                                    width='100%'
                                    src={
                                      image && image?.file_url ?
                                        `http://localhost:8000/${image.file_url}` :
                                        'https://picsum.photos/250/250'
                                    } />
                                </Grid>
                                <Grid item xs={6}>
                                  <Link href={`/products/${product.category.slug}/${product.slug}`}>
                                    <Typography variant='subtitle1' className={classes.titleMenu}>
                                      {product.name}
                                    </Typography>
                                  </Link>
                                  <Typography variant='body1' className={classes.description}>
                                    {product.description}
                                  </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <Box textAlign='right' width='100%'>
                                    <Box>
                                      <Typography variant='subtitle2'
                                        style={{ fontWeight: 500 }}>{`${product.price * count} €`}</Typography>
                                    </Box>
                                    <Box>
                                      <Typography variant='subtitle2'>{`${product.price} € cada uno`}</Typography>
                                    </Box>
                                    <Box className={classes.deleteBox} onClick={() => onCallRemove(product)}>
                                      <DeleteIcon
                                        fontSize='small'
                                        color='secondary'
                                        className={classes.deleteIcon}
                                      /><Typography component='span' variant='subtitle2'> Eliminar</Typography>
                                    </Box>
                                    <Box mt={2} mb={2}>
                                      <IconButton
                                        disableTouchRipple
                                        disableFocusRipple
                                        disableRipple
                                        className={classes.iconButton}
                                        color='secondary'
                                        disabled={count === 1}
                                        onClick={()=>onCallRemoveProduct(product)}
                                      >
                                        <RemoveIcon />
                                      </IconButton>
                                      <TextField
                                        value={count}
                                        variant='outlined'
                                        size='small'
                                        color='secondary'
                                        style={{
                                          width: 50,
                                          borderRadius: 0,
                                          position: 'relative',
                                          top: 3,
                                        }}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      />
                                      <IconButton
                                        disableTouchRipple
                                        disableFocusRipple
                                        disableRipple
                                        onClick={()=>onCallAddProduct(product)}
                                        className={classes.iconButton}
                                        color='secondary'
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                          );
                        })
                      }
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Card className={classes.card}>
                      <CardHeader
                        title={
                          <Typography variant='subtitle1' className={classes.detailsOrdersTitle}>RESUMEN DE SU
                            PEDIDO</Typography>
                        }
                      />
                      <CardContent>
                        <Grid container>
                          <Grid item xs={8}>
                            <Typography variant='subtitle2'>Envio </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Box textAlign='right'>
                              <Typography variant='subtitle2'>0,00 €</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography
                              variant='subtitle2'>{`Subtotal (${countProducts} ${textCountProduct})`} </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Box textAlign='right'>
                              <Typography variant='subtitle2'><strong>{`${totalPrice},00 €`}</strong></Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Divider />
                      <CardActions className={classes.cardActions}>
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <Typography variant='subtitle2'>Total </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Box textAlign='right'>
                              <Typography variant='subtitle2'>{`${totalPrice},00 €`}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Button variant='contained' fullWidth size='large'>PAGAR</Button>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>

                </Grid>
              </Grid> :
              (
                <>
                  <Grid item xs={12}>
                    <Box width='100%' textAlign='center'>
                      <Typography variant='h4' className={classes.noProducts}>
                        No tienes productos registrados
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box width='100%' textAlign='center'>
                      <Button
                        variant='outlined'
                        color='secondary'
                        size='large'
                        onClick={() => router.push('/products')}
                      >SEGUIR COMPRANDO</Button>
                    </Box>
                  </Grid>
                </>
              )
          }
        </Grid>
      </Container>
    </Box>
  );
};