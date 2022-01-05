import React from 'react';
import { LayoutAdministrator } from '../../../shared/layout/LayoutAdministrator';
import { CategoriesView } from '../../../src/admin/categories/CategoriesView';

const Categories: React.FC = () => {
  return (
    <LayoutAdministrator>
      <CategoriesView />
    </LayoutAdministrator>
  );
};

export default Categories;