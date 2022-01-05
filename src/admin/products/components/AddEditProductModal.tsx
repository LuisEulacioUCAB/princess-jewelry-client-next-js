import React from 'react';
import { useCallAction, useEvent } from '@cobuildlab/react-simple-state';
import { DialogDefault } from '../../../../shared/components/dialogs/DialogDefault';
import { AddEditProductForm } from './AddEditProductForm';
import { showSnackbar } from '../../../../shared/components/snackbar/snackbar-actions';
import { onAddEditProductModal } from '../product-events';
import { closeAddEditProductModal, createProduct, updateProduct } from '../product-actions';


interface AddEditCategoryModalProps{
  success: ()=> void;
}

export const AddEditProductModal: React.FC<AddEditCategoryModalProps> = (
  { success }
) =>{

  const { isOpen, product } = useEvent(onAddEditProductModal);
  const isEdition = product !== undefined;
  const title = isEdition ? 'Edit Product' : 'Add Product';
  const [updateProductClick, loadingUpdate] = useCallAction(
    updateProduct,
    {
      onCompleted: () => {
        showSnackbar(
          'success',
          'Product updated successfully!'
        );
        closeAddEditProductModal();
        success();
      },
      onError: (error)=>{
        console.log('error', error);
        showSnackbar(
          'error',
          'Error to updated product!',
        );
      },
    },
  );

  const [createProductClick, loadingCreate] = useCallAction(
    createProduct,
    {
      onCompleted: () => {
        showSnackbar(
          'success',
          'Product created successfully!'
        );
        closeAddEditProductModal();
        success();
      },
      onError: ()=>{
        showSnackbar(
          'error',
          'Error to created product!',
        );
      },
    },
  );


  return (
    <DialogDefault
      open={isOpen}
      title={title}
      onCancel={() => closeAddEditProductModal()}
    >
      <AddEditProductForm
        onSubmit={(values)=>{
          if (isEdition){
            updateProductClick({
              id: product.id,
              ...values
            });
          }else{
            createProductClick({
              ...values
            });
          }
        }}
        product={product}
        isLoading={loadingUpdate || loadingCreate}
      />
    </DialogDefault>
  );
};