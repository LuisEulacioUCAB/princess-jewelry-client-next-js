import { createEvent } from '@cobuildlab/react-simple-state';
import { ProductFileItem, ProductItem } from './product-types';
import {
  CreateProductFileMutation,
  CreateProductMutation, DeleteProductFileMutation,
  UpdateProductFileMutation,
  UpdateProductMutation,
} from '../../gerated/types';


export const fetchProductsOrderByCreatedEvent = createEvent<{ productsOrderByCreated: ProductItem[], count: number }>({
  initialValue:{
    productsOrderByCreated:[],
    count: 0
  }
});

export const fetchProductsOrderByCreatedErrorEvent = createEvent<Error>();


export const fetchProductsEvent = createEvent<{ products: ProductItem[], count: number }>({
  initialValue:{
    products:[],
    count: 0
  }
});




export const fetchProductFilesEvent = createEvent<{ productFiles: ProductFileItem[], count: number }>({
  initialValue:{
    productFiles:[],
    count: 0
  }
});

export const fetchProductFilesErrorEvent = createEvent<Error>();

export const fetchProductsErrorEvent = createEvent<Error>();

export const onAddEditProductModal = createEvent<{
  product?: ProductItem;
  isOpen: boolean;
}>({
  initialValue:{
    product: undefined,
    isOpen: false,
  },
});

export const onSelectedFile = createEvent<{
  productFile: ProductFileItem
}>({
  initialValue:{
    productFile: undefined
  }
});

export const onAddEditProductFileModal = createEvent<{
  productFile?: ProductFileItem;
  isOpen: boolean;
}>({
  initialValue:{
    productFile: undefined,
    isOpen: false,
  },
});

export const onDeleteProductFileModal = createEvent<{
  productFile?: ProductFileItem;
  isOpen: boolean;
}>({
  initialValue:{
    productFile: undefined,
    isOpen: false,
  },
});

export const createProductFileEvent = createEvent<CreateProductFileMutation['createProductFile']>({
  initialValue: undefined
});

export const createProductFileErrorEvent = createEvent<Error>();


export const updateProductFileEvent = createEvent<UpdateProductFileMutation['updateProductFile']>({
  initialValue: undefined
});

export const updateProductFileErrorEvent = createEvent<Error>();


export const createProductEvent = createEvent<CreateProductMutation['createProduct'] | undefined>(
  {
    initialValue: undefined
  }
);

export const createProductErrorEvent = createEvent<Error>();

export const updateProductEvent = createEvent<UpdateProductMutation['updateProduct'] | undefined>(
  {
    initialValue: undefined
  }
);

export const updateProductErrorEvent = createEvent<Error>();


export const fetchProductEvent = createEvent<{ product: ProductItem }>({
  initialValue:{
    product: undefined,
  }
});

export const fetchProductErrorEvent = createEvent<Error>();


export const deleteProductFileEvent = createEvent<DeleteProductFileMutation['deleteProductFile']>({
  initialValue:undefined
});

export const deleteProductFileErrorEvent = createEvent<Error>();

export const onProductGraphModal = createEvent<{
  isOpen: boolean;
  product: ProductItem
}>({
  initialValue:{
    isOpen: false,
    product: undefined
  },
});

export const fetchProductGraphEvent = createEvent<{
  data:number[];
  startDate: string;
  endDate : string;
  categories : string[]
}>({
  initialValue:{
    data:[],
    startDate:'',
    endDate:'',
    categories:[]
  }
});

export const fetchProductGraphErrorEvent = createEvent<Error>();