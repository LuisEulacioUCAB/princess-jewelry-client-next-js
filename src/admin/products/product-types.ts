import { ProductsQuery, ProductFilesQuery } from '../../gerated/types';
import { ArrayElement } from '../../../shared/utils/types';

export type ProductItem = ArrayElement<ProductsQuery['products']['data']>
export type ProductFileItem = ArrayElement<ProductFilesQuery['productFiles']['data']>