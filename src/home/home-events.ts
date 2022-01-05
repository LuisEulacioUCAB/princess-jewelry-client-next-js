import { createEvent } from '@cobuildlab/react-simple-state';
import { ProductFileItem, ProductItem } from '../admin/products/product-types';
import { CategoryItem } from '../admin/categories/category-types';

export const fetchHomeEvent = createEvent<{
  products:ProductItem[]
}>(
  {
    initialValue:{
      products:[]
    }
  }
);

export const fetchHomeErrorEvent = createEvent<Error>();

export const fetchHomeProductEvent = createEvent<{ product: ProductItem }>({
  initialValue:{
    product: undefined,
  }
});

export const fetchHomeProductErrorEvent = createEvent<Error>();

export const onSelectedProductImage = createEvent<{
  productFile: ProductFileItem
}>(
  {
    initialValue:{
      productFile: undefined
    }
  }
);

export const fetchHomeProductsEvent = createEvent<{ products: ProductItem[] ; count: number }>({
  initialValue:{
    products:[],
    count:0
  }
});

export const fetchHomeProductsErrorEvent = createEvent<Error>();


export const onChangeSearch = createEvent<{ search: string }>({
  initialValue:{
    search: ''
  }
});

export const fetchOrdersEvent = createEvent<{ products: { product:ProductItem, count:number }[] }>({
  initialValue:{
    products: []
  }
});

export const fetchOrdersErrorEvent = createEvent<Error>();

export const addProductInStorageEvent = createEvent<{ product: ProductItem }>(
  {
    initialValue:{
      product: undefined
    }
  }
);

export const addProductInStorageErrorEvent = createEvent<Error>();

export const removeProductInStorageEvent = createEvent<{ products: { product:ProductItem, count:number }[] }>({
  initialValue:{
    products:[]
  }
});

export const removeProductInStorageErrorEvent = createEvent<Error>();


export const subsProductInStorageEvent = createEvent<{ product: ProductItem }>(
  {
    initialValue:{
      product: undefined
    }
  }
);

export const subsProductInStorageErrorEvent = createEvent<Error>();


export const fetchHomeCategoriesEvent = createEvent<{
  categories:CategoryItem[]; count: number;
}>({
  initialValue:{
    categories:[],
    count: 0
  }
});

export const fetchHomeCategoriesErrorEvent = createEvent<Error>();