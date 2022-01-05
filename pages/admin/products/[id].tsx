import React from 'react';
import { LayoutAdministrator } from '../../../shared/layout/LayoutAdministrator';
import { ProductsDetailsView } from '../../../src/admin/products/ProductsDetailsView';

export const ProductDetails: React.FC = ()=>{
  return (
    <LayoutAdministrator>
      <ProductsDetailsView/>
    </LayoutAdministrator>
  );
};

export default ProductDetails;