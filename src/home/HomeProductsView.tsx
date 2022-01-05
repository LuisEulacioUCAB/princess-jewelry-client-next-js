import React from 'react';
import { useRouter } from 'next/router';
import { useEvent, useFetchAction } from '@cobuildlab/react-simple-state';
import { Grid, Typography } from '@material-ui/core';
import { fetchHomeProducts } from './home-actions';
import { MainLoader } from '../../shared/components/MainLoader';
import { ProductItem } from '../product/components/ProductItem';
import { fetchCategoriesEvent } from '../admin/categories/category-events';
import { onChangeSearch } from './home-events';


export const HomeProductsView: React.FC = ()=>{

  const router = useRouter();
  const { category: slug } = router.query;
  const { categories } = useEvent(fetchCategoriesEvent);

  const selectedCategory = slug ? categories.find((cat)=> {
    return cat?.slug === slug;
  }) : null;
  const { search } = useEvent(onChangeSearch);

  const [pagination] = React.useState<
    {
      page: number;
      pageSize: number;
    }
    >({
      page:1,
      pageSize:16
    });
  const [{ products }, loading ] = useFetchAction(
    fetchHomeProducts, [pagination.page,pagination.pageSize, selectedCategory ? parseInt(selectedCategory.id) : 0,search],{
      onError:(error)=>console.log('error', error)
    });

  return loading ?
    <MainLoader>Loading products...</MainLoader> :
    <Grid item xs={12}>
      <Grid
        container
        spacing={6}
      >
        {
          products.length ?
            products.map((item) => (
              <>
                <ProductItem product={item} cols={4} />
              </>
            )):
            <Typography variant='subtitle1'>
              No hay productos registrados con el nombre de <strong>{search}</strong>
            </Typography>
        }
      </Grid>
    </Grid>;

};