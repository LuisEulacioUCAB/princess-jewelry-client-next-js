import React from 'react';
import { Button } from '@material-ui/core';
import { useFetchAction } from '@cobuildlab/react-simple-state';
import { TableDefaultPro } from '../../../shared/components/table/TableDefaultPro';
import { CardSection } from '../../../shared/components/card/CardSection';
import { fetchProducts, openAddEditProductModal, openProductGraphModal } from './product-actions';
import { AddEditProductModal } from './components/AddEditProductModal';
import { CURRENCY } from '../../constants';
import { ProductLink } from './components/ProductLink';
import { ProductGraphModal } from './components/ProductGraphModal';

export const ProductsView: React.FC = ()=>{
  const [pagination, setPagination] = React.useState<
    {
      page: number;
      pageSize: number;
    }
    >({
      page:1,
      pageSize:5
    });
  
  const [
    { products , count },
    loading,
    { refetch }
  ] = useFetchAction(fetchProducts,[pagination.page, pagination.pageSize]);


  return (
    <>
      <CardSection
        title="Products"
        actions={[
          <Button onClick={() => openAddEditProductModal(undefined)} variant='contained' size='large'>
            Add Products
          </Button>
        ]}
      >
        <TableDefaultPro
          page={pagination.page}
          pageSize={pagination.pageSize}
          onChangePageSize={(value) =>
            setPagination({ page: 1, pageSize: value })
          }
          onChangePage={(value) =>
            setPagination({ page: value, pageSize: pagination.pageSize })
          }
          totalItems={count}
          items={products}
          columns={[
            {
              columnName:'Product name',
              columnValue:null,
              columnComponent: (item)=><ProductLink product={item}/>
            },
            {
              columnName:'Description',
              columnValue:(item)=> item.description,
            },
            {
              columnName:'Category',
              columnValue:(item)=> item.category.name,
            },
            {
              columnName:'Price',
              columnValue:(item)=> {
                const productCurrency = CURRENCY.find((curr)=> {
                  return curr.key === item.currency;
                });
                return `${item.price} ${productCurrency.label}`;
              },
            },
            {
              columnName:'Stock',
              columnValue:(item)=> item.stock,
            },
          ]}
          loading={loading}
          messageLoading="Loading products..."
          actions={[
            {
              actionName: 'Edit',
              onClick: (item) => openAddEditProductModal(item),
            }
          ]}
        />

      </CardSection>
      <AddEditProductModal success={()=>refetch()}/>

    </>

  );
};