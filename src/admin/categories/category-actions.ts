import { createAction } from '@cobuildlab/react-simple-state';
import {
  createCategoryErrorEvent,
  createCategoryEvent,
  fetchCategoriesErrorEvent,
  fetchCategoriesEvent, updateCategoryErrorEvent, updateCategoryEvent,
  onAddEditCategoryModal, onShowCategoryInHomeModel,
} from './category-events';
import { client } from '../../../shared/apollo';
import {
  CategoriesDocument,
  CreateCategoryDocument,
  CreateCategoryInput, UpdateCategoryDocument,
  UpdateCategoryInput,
} from '../../gerated/types';
import { createSyncAction } from '../../../shared/state';
import { getPageFilters } from '../../../shared/utils/pagination';
import { CategoryItem } from './category-types';

export const openShowCategoryInHomeModal = createSyncAction(
  onShowCategoryInHomeModel,(prev, category:CategoryItem)=>(
    {
      category,
      isOpen:true
    }
  )
);

export const closeShowCategoryInHomeModel = createSyncAction(
  onShowCategoryInHomeModel, ()=>(
    {
      category: undefined,
      isOpen: false
    }
  )
);


export const openAddEditCategoryModal = createSyncAction(
  onAddEditCategoryModal, (prev, category: CategoryItem)=> (
    {
      category,
      isOpen: true
    }
  )
);

export const closeAddEditCategoryModal = createSyncAction(
  onAddEditCategoryModal, ()=> (
    {
      category: undefined,
      isOpen: false
    }
  )
);

export const fetchCategories = createAction(
  fetchCategoriesEvent,
  fetchCategoriesErrorEvent,
  async (page: number, pageSize: number)=>{
    const response = await client.query({
      query: CategoriesDocument,
      variables:{
        ...getPageFilters(page, pageSize)
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

export const createCategory= createAction(
  createCategoryEvent,
  createCategoryErrorEvent,
  async (data: CreateCategoryInput) => {
    const response = await client.mutate({
      mutation: CreateCategoryDocument,
      variables: { data },
    });

    await client.cache.reset();

    return response.data.createCategory;
  },
);

export const updateCategory = createAction(
  updateCategoryEvent,
  updateCategoryErrorEvent,
  async (data: UpdateCategoryInput) => {
    const response = await client.mutate({
      mutation: UpdateCategoryDocument,
      variables: { data },
    });

    await client.cache.reset();

    return response.data.updateCategory;
  },
);