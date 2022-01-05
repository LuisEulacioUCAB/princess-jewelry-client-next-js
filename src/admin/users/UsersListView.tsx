import React from 'react';
import { useFetchAction } from '@cobuildlab/react-simple-state';
import { fetchUsers } from './user-actions';
import { CardSection } from '../../../shared/components/card/CardSection';
import { TableDefaultPro } from '../../../shared/components/table/TableDefaultPro';

export const UsersListView: React.FC = ()=>{

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
    { users, count },
    loading,
    { refetch }
  ] = useFetchAction(fetchUsers,[pagination.page, pagination.pageSize]);

  return (
    <>
      <CardSection title='Users management'>
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
          items={users} 
          columns={[
            {
              columnName:'Full Name',
              columnValue:(item)=> `${item.first_name} ${item.last_name}`,
            },
            {
              columnName:'Email',
              columnValue:(item)=> item.email,
            },
            {
              columnName:'Role',
              columnValue:(item)=> item.role,
            },
          ]}
          loading={loading}
          messageLoading="Loading users..."
        />
      </CardSection>
    </>
  );
};