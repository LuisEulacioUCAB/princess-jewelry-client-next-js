import { ProductFileItem } from './product-types';

export const validateIsPrincipalProductFile = (items: ProductFileItem[] ): ProductFileItem=>{
  return items.find((item) => item.principal === true);
};