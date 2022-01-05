import React from 'react';
import { Layout } from '../../shared/layout/Layout';
import { LayoutProducts } from '../../shared/layout/LayoutProducts';
import { HomeProductsView } from '../../src/home/HomeProductsView';

const HomeProducts: React.FC = ()=>{
  return(
    <Layout>
      <LayoutProducts>
        <HomeProductsView/>
      </LayoutProducts>
    </Layout>
  );
};

export default HomeProducts;