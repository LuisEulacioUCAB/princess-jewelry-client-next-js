import React from 'react';
import { ProductDetailsView } from '../../../src/product/ProductDetailsView';
import { Layout } from '../../../shared/layout/Layout';

const ProductDetails : React.FC = ()=>{
  return (
    <Layout>
      <ProductDetailsView/>
    </Layout>
  );
};

export default ProductDetails;