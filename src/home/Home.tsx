import React from 'react';
import { Box, Grid, Container, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useFetchAction } from '@cobuildlab/react-simple-state';
import Link from 'next/link';
import { Layout } from '../../shared/layout/Layout';
import { HomeCarousel } from './components/HomeCarousel';
import { ProductItem } from '../product/components/ProductItem';
import { HomeProducts } from './components/HomeProducts';
import { fetchHome, fetchHomeCategories } from './home-actions';
import { ProductItem as ProductType } from '../admin/products/product-types';
import { fetchProductsOrderByCreated } from '../admin/products/product-actions';
import { SkeletonProductItem } from '../../shared/components/skeleton/SkeletonProductItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box:{
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
    },
    boxTitle:{
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    box1:{
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10)
    },
    box2:{
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12)
    },
    container1:{
      background:'linear-gradient(90deg, rgba(241,224,214,1) 0%, rgba(255,255,255,1) 35%, rgba(241,224,214,1) 100%)'
    },
    container2:{
      backgroundImage:'url("/products.svg")',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover'
    },
    container3:{
      backgroundColor:'#8E785F'
    },
  })
);

interface SelectedProducts{
  products: ProductType[],
  categorySlug: string,
  position: string,
}


const Home: React.FC = () => {
  const classes = useStyles();
  const [homeProducts, setHomeProducts] = React.useState<SelectedProducts[]>([]);
  const [
    { categories },
  ] = useFetchAction(fetchHomeCategories,[1, 100]);

  const [{ productsOrderByCreated },productsOrderByCreatedLoading] = useFetchAction(fetchProductsOrderByCreated,[1,4]);

  const [,,] = useFetchAction(fetchHome,[categories],{
    onCompleted:({ products: items })=>{
      const sanitizeProducts:SelectedProducts[] = [];
      items.forEach((item, index)=>{
        const getSanitizeProduct = sanitizeProducts.find((x)=> x.categorySlug === item.category.slug);

        if(getSanitizeProduct){
          getSanitizeProduct.products.push(item);
        }else{
          sanitizeProducts.push({
            products:[item],
            categorySlug:item.category.slug,
            position: !(index % 2) ? 'right': 'left'
          });
        }

      });
      setHomeProducts(sanitizeProducts);
    }
  });

  return(
    <Layout>
      <HomeCarousel />
      <Box className={classes.container1}>
        <Container >
          <Box className={classes.box}>
            <Grid container spacing={6} alignItems='center'>
              <Grid item xs={6}>
                <Box className={classes.boxTitle}>
                  <Typography variant='h3'>MAS VENDIDO</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
                    1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <img alt='ring' width='100%' src='/ring.webp' />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box >
        <Container>
          <Box className={classes.box}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h3'>DESTACADO</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={6}
                >
                  {
                    productsOrderByCreatedLoading ? [1,2,3,4].map(()=><SkeletonProductItem cols={3}/>):
                      productsOrderByCreated.map((item) => <ProductItem product={item} cols={3} />)
                  }
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box className={classes.container3}>
        <Container>
          <Box className={classes.box1}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent='center'
              spacing={4}
            >
              <Grid item>
                <Box textAlign='center'>
                  <Typography variant='h4'>¿Quieres vender nuestros productos?</Typography>
                </Box>
                <Box textAlign='center'>
                  <Typography variant='subtitle1'>Conocer nuestros precios al mayor</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box width={220}>
                  <Link href='/products'>
                    <Button variant='contained' size='large' fullWidth>Ver mas</Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      {
        homeProducts.map(({ position, products, categorySlug })=>{
          return position === 'right'? (
            <Container>
              <Box className={classes.box2}>
                <HomeProducts showProductsRight principalImage="/ring.webp" items={products} viewMore={`/products/${categorySlug}`}/>
              </Box>
            </Container>
          ):(
            <Box className={classes.container2}>
              <Container>
                <Box className={classes.box2}>
                  <HomeProducts  principalImage="/ring.webp" items={products} viewMore={`/products/${categorySlug}`}/>
                </Box>
              </Container>
            </Box>
          );
        })
      }

      <Box className={classes.container3}>
        <Container>
          <Box className={classes.box}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h3'>OCASIONES</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={6}
                >
                  {
                    productsOrderByCreatedLoading ? [1,2,3,4].map(()=><SkeletonProductItem cols={3}/>):
                      productsOrderByCreated.map((item) => <ProductItem product={item} cols={3} />)
                  }
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;