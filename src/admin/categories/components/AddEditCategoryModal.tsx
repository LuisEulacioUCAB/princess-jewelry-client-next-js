import React from 'react';
import { useCallAction, useEvent } from '@cobuildlab/react-simple-state';
import { onAddEditCategoryModal } from '../category-events';
import { DialogDefault } from '../../../../shared/components/dialogs/DialogDefault';
import { closeAddEditCategoryModal, createCategory, updateCategory } from '../category-actions';
import { AddEditCategoryForm } from './AddEditCategoryForm';
import { showSnackbar } from '../../../../shared/components/snackbar/snackbar-actions';


interface AddEditCategoryModalProps{
  success: ()=> void;
}

export const AddEditCategoryModal: React.FC<AddEditCategoryModalProps> = (
  { success }
) =>{

  const { isOpen, category } = useEvent(onAddEditCategoryModal);
  const isEdition = category !== undefined;
  const title = isEdition ? 'Edit Category' : 'Add Category';
  const [updateCategoryClick, loadingUpdate] = useCallAction(
    updateCategory,
    {
      onCompleted: () => {
        showSnackbar(
          'success',
          'Category updated successfully!'
        );
        closeAddEditCategoryModal();
        success();
      },
      onError: (error)=>{
        console.log('error', error);
        showSnackbar(
          'error',
          'Error to  updated category!',
        );
      },
    },
  );

  const [createCategoryClick, loadingCreate] = useCallAction(
    createCategory,
    {
      onCompleted: () => {
        showSnackbar(
          'success',
          'Category created successfully!'
        );
        closeAddEditCategoryModal();
        success();
      },
      onError: ()=>{
        showSnackbar(
          'error',
          'Error to created successfully!',
        );
      },
    },
  );


  return (
    <DialogDefault
      open={isOpen}
      title={title}
      onCancel={() => closeAddEditCategoryModal()}
    >
      <AddEditCategoryForm
        onSubmit={(values)=>{
          if (isEdition){
            updateCategoryClick({
              id: category.id,
              ...values
            });
          }else{
            createCategoryClick({
              ...values
            });
          }
        }}
        category={category}
        isLoading={loadingUpdate || loadingCreate}
      />
    </DialogDefault>
  );
};