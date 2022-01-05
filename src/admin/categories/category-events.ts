import {createEvent} from '@cobuildlab/react-simple-state';
import { CategoryItem } from './category-types';
import { CreateCategoryMutation , UpdateCategoryMutation} from '../../gerated/types';

export const fetchCategoriesEvent = createEvent<{
  categories:CategoryItem[]; count: number;
}>({
  initialValue:{
    categories:[],
    count: 0
  }
});

export const fetchCategoriesErrorEvent = createEvent<Error>();

export const onAddEditCategoryModal = createEvent<{
  category?: CategoryItem;
  isOpen: boolean;
}>({
  initialValue: {
    category: undefined,
    isOpen: false,
  },
});

export const onShowCategoryInHomeModel = createEvent<{
  category?: CategoryItem;
  isOpen: boolean;
}>(
  {
    initialValue:{
      category:undefined,
      isOpen:false,
    }
  }
);

export const createCategoryEvent = createEvent<
  | CreateCategoryMutation['createCategory']
  | undefined
  >({
    initialValue: undefined,
  });

export const createCategoryErrorEvent = createEvent<Error>();

export const updateCategoryEvent = createEvent<
  | UpdateCategoryMutation['updateCategory']
  | undefined
  >({
    initialValue: undefined,
});

export const updateCategoryErrorEvent = createEvent<Error>();

