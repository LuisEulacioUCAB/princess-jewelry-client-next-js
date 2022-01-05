import { createAction } from '@cobuildlab/react-simple-state/lib/actions';
import moment from 'moment';
import {
  createProductErrorEvent,
  createProductEvent,
  createProductFileErrorEvent,
  createProductFileEvent,
  deleteProductFileErrorEvent,
  deleteProductFileEvent,
  fetchProductErrorEvent,
  fetchProductEvent,
  fetchProductFilesErrorEvent,
  fetchProductFilesEvent, fetchProductGraphErrorEvent, fetchProductGraphEvent,
  fetchProductsErrorEvent,
  fetchProductsEvent,
  fetchProductsOrderByCreatedErrorEvent,
  fetchProductsOrderByCreatedEvent,
  onAddEditProductFileModal,
  onAddEditProductModal,
  onDeleteProductFileModal, onProductGraphModal,
  onSelectedFile,
  updateProductErrorEvent,
  updateProductEvent,
  updateProductFileErrorEvent,
  updateProductFileEvent,
} from './product-events';
import { client, uploadClient } from '../../../shared/apollo';
import {
  CreateProductDocument,
  CreateProductFileDocument,
  CreateProductFileInput,
  CreateProductInput, DeleteProductFileDocument,
  ProductDocument,
  ProductFilesDocument,
  ProductsDocument, ProductVisitByDateDocument,
  UpdateProductDocument,
  UpdateProductFileDocument,
  UpdateProductFileInput,
  UpdateProductInput,
} from '../../gerated/types';
import { createSyncAction } from '../../../shared/state';
import { ProductFileItem, ProductItem } from './product-types';
import { getPageFilters } from '../../../shared/utils/pagination';

export const selectedItem = createSyncAction(
  onSelectedFile, (prev, productFile: ProductFileItem)=> (
    {
      productFile
    }
  )
);

export const openProductGraphModal = createSyncAction(
  onProductGraphModal, (prev, product: ProductItem )=> (
    {
      isOpen: true,
      product
    }
  )
);

export const closeProductGraphModal = createSyncAction(
  onProductGraphModal, ()=> (
    {
      isOpen: false,
      product: undefined
    }
  )
);



export const openDeleteProductFileModal = createSyncAction(
  onDeleteProductFileModal, (prev, productFile: ProductFileItem)=> (
    {
      productFile,
      isOpen: true
    }
  )
);

export const closeDeleteProductFileModal = createSyncAction(
  onDeleteProductFileModal, ()=> (
    {
      productFile: undefined,
      isOpen: false
    }
  )
);


export const openAddEditProductFileModal = createSyncAction(
  onAddEditProductFileModal, (prev, productFile: ProductFileItem)=> (
    {
      productFile,
      isOpen: true
    }
  )
);

export const closeAddEditProductFileModal = createSyncAction(
  onAddEditProductFileModal, ()=> (
    {
      productFile: undefined,
      isOpen: false
    }
  )
);

export const openAddEditProductModal = createSyncAction(
  onAddEditProductModal, (prev, product: ProductItem)=> (
    {
      product,
      isOpen: true
    }
  )
);

export const closeAddEditProductModal = createSyncAction(
  onAddEditProductModal, ()=> (
    {
      product: undefined,
      isOpen: false
    }
  )
);

export const fetchProducts = createAction(
  fetchProductsEvent,
  fetchProductsErrorEvent,
  async (page: number, pageSize: number)=>{

    const response = await client.query({
      query: ProductsDocument,
      variables:{
        ...getPageFilters(page,pageSize),
      },
      fetchPolicy:'network-only'
    });


    const { data , paginatorInfo } = response.data.products;



    return {
      products: data,
      count: paginatorInfo.total
    };
    
  }
);

export const createProduct= createAction(
  createProductEvent,
  createProductErrorEvent,
  async (data: CreateProductInput) => {
    const response = await client.mutate({
      mutation: CreateProductDocument,
      variables: { data },
    });

    await client.cache.reset();

    return response.data.createProduct;
  },
);

export const updateProduct = createAction(
  updateProductEvent,
  updateProductErrorEvent,
  async (data: UpdateProductInput) => {
    const response = await client.mutate({
      mutation: UpdateProductDocument,
      variables: { data },
    });

    await client.cache.reset();

    return response.data.updateProduct;
  },
);

export const fetchProduct = createAction(
  fetchProductEvent,
  fetchProductErrorEvent,
  async (id: string)=>{

    const response = await client.query({
      query: ProductDocument,
      variables:{
        id
      }
    });

    return { product: response.data.product };
  }
);

export const fetchProductFiles = createAction(
  fetchProductFilesEvent,
  fetchProductFilesErrorEvent,
  async (page: number, pageSize: number, product_id) => {

    const response = await client.query({
      query: ProductFilesDocument,
      variables:{
        ...getPageFilters(page,pageSize),
        product_id:parseInt(product_id)
      }
    });

    const { data, paginatorInfo } = response.data.productFiles;

    return {
      productFiles: data,
      count: paginatorInfo.total
    };
  }
);

export const createProductFile = createAction(
  createProductFileEvent,
  createProductFileErrorEvent,
  async (data: CreateProductFileInput) => {
    const response = await uploadClient.mutate({
      mutation: CreateProductFileDocument,
      variables: { data },
    });

    await client.cache.reset();

    return response.data.createProductFile;
  },
);

export const updateProductFile = createAction(
  updateProductFileEvent,
  updateProductFileErrorEvent,
  async (data: UpdateProductFileInput) => {
    const response = await uploadClient.mutate({
      mutation: UpdateProductFileDocument,
      variables: { data },
    });

    await client.cache.reset();

    return response.data.updateProductFile;
  },
);

export const deleteProductFile = createAction(
  deleteProductFileEvent,
  deleteProductFileErrorEvent,
  async (id: string) => {
    const response = await uploadClient.mutate({
      mutation: DeleteProductFileDocument,
      variables: { id },
    });

    await client.cache.reset();

    return response.data.deleteProductFile;
  },
);

export const fetchProductsOrderByCreated = createAction(
  fetchProductsOrderByCreatedEvent,
  fetchProductsOrderByCreatedErrorEvent,
  async (page: number, pageSize: number)=>{

    const response = await client.query({
      query: ProductsDocument,
      variables:{
        ...getPageFilters(page,pageSize),
      },
      fetchPolicy:'network-only'
    });


    const { data , paginatorInfo } = response.data.products;



    return {
      productsOrderByCreated: data,
      count: paginatorInfo.total
    };

  }
);

export const fetchProductGraph = createAction(
  fetchProductGraphEvent,
  fetchProductGraphErrorEvent, async (product: ProductItem, period: string)=>{

    if (!product) return {
      data: [],
      startDate:'',
      endDate:'',
      categories:[]
    };

    let startDate = null;
    let endDate = null;
    let diffDate = null;
    let formatDate = null;
    const categories = [];

    if(period === 'monthly'){
      diffDate = 'days';
      startDate = moment().startOf('month');
      endDate = moment().endOf('month');
      formatDate = 'D';
    }else if(period === 'weekly'){
      diffDate = 'days';
      startDate = moment().startOf('week');
      endDate = moment().endOf('week');
      formatDate = 'D';
    }else if(period === 'daily'){
      diffDate = 'hours';
      startDate = moment().startOf('day');
      endDate = moment().endOf('day');
      formatDate = 'HH:ss';
    }else if(period === 'annual') {
      diffDate = 'months';
      startDate = moment().startOf('year');
      endDate = moment().endOf('year');
      formatDate = 'MMM';
    }

    const diff = moment(endDate).diff(startDate, diffDate);

    // eslint-disable-next-line no-plusplus
    for(let i=0; i <=diff; i++){
      const newStartDate = moment(startDate).add(i, diffDate).utc().format();
      categories.push(
        moment(newStartDate).locale('es').format(formatDate)
      );
    }

    const response = await client.query({
      query: ProductVisitByDateDocument,
      variables: {
        productId:product.id,
        period
      }
    });

    const { data } = response.data.productVisitByDate;

    return {
      data,
      startDate: moment(startDate).format('LLL'),
      endDate: moment(endDate).format('LLL'),
      categories
    };
  }
);