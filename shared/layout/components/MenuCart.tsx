import React from 'react';
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { ShoppingCartOutlined as CartIcon,DeleteOutlined as DeleteIcon } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useCallAction, useFetchAction, useSubscription } from '@cobuildlab/react-simple-state';
import Link from 'next/link';
import { addProductInStorageEvent } from '../../../src/home/home-events';
import { fetchOrders, removeProductFromStorage } from '../../../src/home/home-actions';
import { ProductFileItem } from '../../../src/admin/products/product-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      minWidth: 30,
    },
    menu: {
      top: '12px!important',
    },
    menuItem: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    menuItem1: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      maxHeight: 400,
    },
    titleMenu: {
      fontWeight: 500,
      textTransform: 'uppercase',
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
    cardContent: {
      width: 360,
      maxHeight: 400,
      overflow: 'auto',
    },
    button: {
      width: '100%',
    },
    deleteBox:{
      '&:hover':{
        textDecoration:'underline',
      },
      cursor:'pointer'
    },
    deleteIcon:{
      position:'relative',
      top:4
    }
  }),
);

export const MenuCart: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [countProducts, setCountProducts] = React.useState<number>(0);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const handleCloseUserMenu = (): void => setAnchorEl(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget);
  const openUserMenu = Boolean(anchorEl);
  const classes = useStyles();
  const [{ products }, , { refetch }] = useFetchAction(fetchOrders, [], {
    onCompleted: (data) => {
      const a = data.products?.reduce((acc, { count }) => {
        return acc + count;
      }, 0);

      const tp = data.products?.reduce((acc, { count , product }) => {
        const totalByProduct = product.price * count;
        return acc + totalByProduct;
      }, 0);
      setCountProducts(a);
      setTotalPrice(tp);
    },
  });

  const [onCallRemove] = useCallAction(removeProductFromStorage,{
    onCompleted: ()=>refetch()
  });


  useSubscription(addProductInStorageEvent, () => {
    refetch();
  });

  const textCountProduct = countProducts > 1 ? 'productos' : 'producto';

  return (
    <>
      <IconButton
        size='small'
        onClick={handleOpenUserMenu}
      >
        <Badge color='secondary' badgeContent={countProducts}>
          <CartIcon fontSize='small' />
        </Badge>
      </IconButton>
      {
        (products ?? []) && (products ?? []).length ? (
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            getContentAnchorEl={null}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openUserMenu}
            onClose={handleCloseUserMenu}
            className={classes.menu}
          >
            <Card elevation={0}>
              <CardContent className={classes.cardContent}>
                {
                  products?.map(({ product, count },key) => {

                    let image: ProductFileItem = product?.product_files?.find((i) => {
                      return i.principal === true;
                    });

                    if (!image) {
                      image = product?.product_files?.length ? product?.product_files[0] : null;
                    }

                    return (
                      <>
                        { key!== 0 && (<Box mb={3} mt={1}><Divider/></Box>) }
                        <Box mb={1}>
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
                                height={65}
                                src={
                                  image && image?.file_url ?
                                    `http://localhost:8000/${image.file_url}` :
                                    'https://picsum.photos/250/250'
                                } />
                            </Grid>
                            <Grid item xs={9}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Link href={`/products/${product.category.slug}/${product.slug}`}>
                                    <Typography variant='subtitle2' className={classes.titleMenu}>
                                      {product.name}
                                    </Typography>
                                  </Link>
                                  <Box>
                                    <Typography variant='caption'>Cantidad: {count}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant='caption' style={{ fontWeight:500 }}>{`${product.price * count} €`}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant='caption'>{`${product.price} € cada uno`}</Typography>
                                  </Box>
                                  <Box className={classes.deleteBox} onClick={()=>onCallRemove(product)}>
                                    <DeleteIcon
                                      fontSize='small'
                                      color='secondary'
                                      className={classes.deleteIcon}
                                    /><Typography variant='caption'> Eliminar</Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    );
                  })
                }
              </CardContent>
              <Divider />

              <CardActions>
                <Box display='flex' justifyContent='space-between' width='100%'>
                  <Box width='45%'>
                    <Box width='100%' mb={1}>
                      <Typography variant='caption' style={{ fontWeight:500 }}>{`Pedidos (${countProducts} ${textCountProduct}) `} </Typography>
                    </Box>
                    <Button
                      variant='outlined'
                      size='large'
                      className={classes.button}
                      onClick={()=>router.push('/orders')}
                    >
                      PEDIDOS
                    </Button>
                  </Box>
                  <Box width='45%'>
                    <Box width='100%' mb={1} textAlign='right'>
                      <Typography variant='caption' style={{ fontWeight:500 }}>{`Total: ${totalPrice} €`}</Typography>
                    </Box>
                    <Button variant='contained' size='large' className={classes.button}>
                      PAGAR
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Menu>
        ) : null
      }
    </>
  );
};