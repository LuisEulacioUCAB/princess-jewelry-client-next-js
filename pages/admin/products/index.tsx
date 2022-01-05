import React from 'react';
import { LayoutAdministrator } from '../../../shared/layout/LayoutAdministrator';
import { ProductsView } from '../../../src/admin/products/ProductsView';

const Products: React.FC = ()=>{
  return(
    <LayoutAdministrator>
      <ProductsView/>
    </LayoutAdministrator>
  );
};

export default Products;