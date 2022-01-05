import React from 'react';
import { Button, Chip } from '@material-ui/core';
import { useFetchAction } from '@cobuildlab/react-simple-state';
import { TableDefaultPro } from '../../../shared/components/table/TableDefaultPro';
import { CardSection } from '../../../shared/components/card/CardSection';
import { fetchCategories, openAddEditCategoryModal, openShowCategoryInHomeModal } from './category-actions';
import { AddEditCategoryModal } from './components/AddEditCategoryModal';
import { ShowCategoryInHomeModal } from '../products/components/ShowCategoryInHomeModal';
import { ProductLink } from '../products/components/ProductLink';

export const CategoriesView: React.FC = ()=>{
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
    { categories , count },
    isLoading, { refetch }
  ] = useFetchAction(fetchCategories,[pagination.page, pagination.pageSize]);

  return (
    <>
      <CardSection
        title="Categories"
        actions={[
          <Button onClick={() => openAddEditCategoryModal(undefined)} variant='contained' size='large'>
            Add Categories
          </Button>,
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
          items={categories}
          columns={[
            {
              columnName:'Category name',
              columnValue:(item)=> item.name,
            },
            {
              columnName:'Home page',
              columnValue: null,
              columnComponent: (item)=><Chip
                style={{ fontWeight:'bold' }}
                label={item.show_in_home ? 'Show in home' : 'Hide in home'}
                color={item.show_in_home ? 'secondary':'default'}
              />
            }
          ]}
          loading={isLoading}
          messageLoading="Loading categories..."
          actions={[
            {
              actionName: 'Edit',
              onClick: (item) => openAddEditCategoryModal(item),
            },
            {
              actionName: (item )=> item?.show_in_home ? 'Hide in home page' : 'Show in home page',
              onClick: (item) => openShowCategoryInHomeModal(item),
            }
          ]}
        />

      </CardSection>
      <AddEditCategoryModal success={()=>refetch()}/>
      <ShowCategoryInHomeModal success={()=>refetch()}/>
    </>

  );
};