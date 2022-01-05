import { CategoriesQuery } from '../../gerated/types';
import { ArrayElement } from '../../../shared/utils/types';

export type CategoryItem = ArrayElement<CategoriesQuery['categories']['data']>

