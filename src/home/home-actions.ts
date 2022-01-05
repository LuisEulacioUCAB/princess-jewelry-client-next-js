import { createAction } from '@cobuildlab/react-simple-state/lib/actions';
import {
  addProductInStorageErrorEvent,
  addProductInStorageEvent, fetchHomeCategoriesErrorEvent, fetchHomeCategoriesEvent,
  fetchHomeErrorEvent,
  fetchHomeEvent,
  fetchHomeProductErrorEvent,
  fetchHomeProductEvent,
  fetchHomeProductsErrorEvent,
  fetchHomeProductsEvent,
  fetchOrdersErrorEvent,
  fetchOrdersEvent,
  onChangeSearch,
  onSelectedProductImage,
  removeProductInStorageErrorEvent,
  removeProductInStorageEvent,
  subsProductInStorageErrorEvent,
  subsProductInStorageEvent,
} from './home-events';
import { client } from '../../shared/apollo';
import { CategoriesDocument, ProductDocument, ProductsDocument, ProductsQueryVariables } from '../gerated/types';
import { getPageFilters } from '../../shared/utils/pagination';
import { createSyncAction } from '../../shared/state';
import { ProductFileItem, ProductItem } from '../admin/products/product-types';
import { CategoryItem } from '../admin/categories/category-types';
import { fetchCategoriesErrorEvent, fetchCategoriesEvent } from '../admin/categories/category-events';

export const changeSearch = createSyncAction(
  onChangeSearch, (prev, search: string) => (
    {
      search,
    }
  ),
);

export const selectedProductImage = createSyncAction(
  onSelectedProductImage, (prev, productFile: ProductFileItem) => (
    {
      productFile,
    }
  ),
);


export const fetchHome = createAction(
  fetchHomeEvent,
  fetchHomeErrorEvent,
  async (categories: CategoryItem[]) => {

    if(!categories.length) return {
      products:[],
    };

    const products:ProductItem[] = await categories.reduce(async (acc, curr)=>{
      const response = await client.query({
        query: ProductsDocument,
        variables:{
          ...getPageFilters(1,4),
          category_id:parseInt(curr.id)
        },
        fetchPolicy:'network-only'
      });

      const { data  } = response.data.products;
      return [...await acc, ...data];
    },Promise.resolve([]));


    return {
      products
    };

  },
);

export const fetchHomeProduct = createAction(
  fetchHomeProductEvent,
  fetchHomeProductErrorEvent,
  async (slug: string) => {

    const response = await client.query({
      query: ProductDocument,
      variables: {
        slug,
      },
    });

    return { product: response.data.product };
  },
);

export const fetchHomeProducts = createAction(
  fetchHomeProductsEvent,
  fetchHomeProductsErrorEvent,
  async (page: number, pageSize: number, category_id: number, search: string) => {

    let variables: ProductsQueryVariables = {
      ...getPageFilters(page, pageSize),
    };

    if (category_id) {
      variables = {
        ...variables,
        category_id,
      };
    }

    if (search) {
      variables = {
        ...variables,
        name: `%${search}%`,
      };
    }

    const response = await client.query({
      query: ProductsDocument,
      variables,
      fetchPolicy: 'network-only',
    });


    const { data, paginatorInfo } = response.data.products;

    return {
      products: data,
      count: paginatorInfo.total,
    };

  },
);


export const addProductInStorage = createAction(
  addProductInStorageEvent,
  addProductInStorageErrorEvent,
  async (item: ProductItem) => {
    const products: { product: ProductItem, count: number }[] = JSON.parse(localStorage.getItem('productsOrders')) || [];

    if (products.length) {
      const productInStorage = products.find((i) => {
        return i.product.id === item.id;
      });
      if (productInStorage) {
        productInStorage.count += 1;
      } else {
        products.push({
          product: item,
          count: 1,
        });
      }
    } else {

      products.push(
        {
          product: item,
          count: 1,
        }
      );
    }


    localStorage.setItem('productsOrders', JSON.stringify(products));

    return { product: item };
  },
);


export const fetchOrders = createAction(
  fetchOrdersEvent,
  fetchOrdersErrorEvent, async()=>{
    return { products:JSON.parse(localStorage.getItem('productsOrders')) };
  }
);

export const removeProductFromStorage = createAction(
  removeProductInStorageEvent,
  removeProductInStorageErrorEvent,
  async (item: ProductItem)=>{
    const products: { product: ProductItem, count: number }[] = JSON.parse(localStorage.getItem('productsOrders')) || [];

    localStorage.setItem('productsOrders', JSON.stringify(products.filter(({ product })=> product.id !== item.id)));

    return {
      products
    };
  }
);

export const subsProductInStorage = createAction(
  subsProductInStorageEvent,
  subsProductInStorageErrorEvent,
  async (item: ProductItem) => {
    const products: { product: ProductItem, count: number }[] = JSON.parse(localStorage.getItem('productsOrders')) || [];

    if (products.length) {
      const productInStorage = products.find((i) => {
        return i.product.id === item.id;
      });
      if (productInStorage) {
        productInStorage.count -= 1;
      }

    }
    localStorage.setItem('productsOrders', JSON.stringify(products));

    return { product: item };
  },
);


export const fetchHomeCategories = createAction(
  fetchHomeCategoriesEvent,
  fetchHomeCategoriesErrorEvent,
  async (page: number, pageSize: number)=>{
    const response = await client.query({
      query: CategoriesDocument,
      variables:{
        ...getPageFilters(page, pageSize),
        show_in_home:true
      },
      fetchPolicy:'network-only'
    });

    const { data , paginatorInfo } = response.data.categories;

    return {
      categories: data,
      count: paginatorInfo.total
    };
  }
);