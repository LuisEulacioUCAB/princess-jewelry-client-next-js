import React from 'react';
import { Layout } from '../../shared/layout/Layout';
import { HomeOrdersView } from '../../src/home/HomeOrdersView';

const Orders: React.FC = ()=>(
  <Layout>
    <HomeOrdersView/>
  </Layout>
);

export default Orders;