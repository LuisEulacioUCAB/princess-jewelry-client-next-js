import React from 'react';
import { useCallAction, useEvent } from '@cobuildlab/react-simple-state';
import { useRouter } from 'next/router';
import { DialogDefault } from '../../../../shared/components/dialogs/DialogDefault';
import { showSnackbar } from '../../../../shared/components/snackbar/snackbar-actions';
import { onAddEditProductFileModal } from '../product-events';
import {
  closeAddEditProductFileModal,
  createProductFile,
  updateProductFile,
} from '../product-actions';
import { AddEditProductFileForm } from './AddEditProductFileForm';

interface AddEditProductFileModalProps{
  success: ()=> void;
}

export const AddEditProductFileModal: React.FC<AddEditProductFileModalProps> = (
  { success }
) =>{

  const { isOpen, productFile } = useEvent(onAddEditProductFileModal);
  const isEdition = productFile !== undefined;
  const title = isEdition ? 'Edit File ' : 'Add File';
  const router = useRouter();
  const { id: product_id } = router.query;


  const [updateProductFileClick, loadingUpdate] = useCallAction(
    updateProductFile,
    {
      onCompleted: () => {
        showSnackbar(
          'success',
          'Product file updated successfully!'
        );
        closeAddEditProductFileModal();
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

  const [createProductFileClick, loadingCreate] = useCallAction(
    createProductFile,
    {
      onCompleted: () => {
        showSnackbar(
          'success',
          'Product File created successfully!'
        );
        closeAddEditProductFileModal();
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
      onCancel={() => closeAddEditProductFileModal()}
    >
      <AddEditProductFileForm
        onSubmit={(values)=>{
          if (isEdition){
            updateProductFileClick({
              ...values,
              id: productFile.id,
              principal: productFile.principal,
              product_id,
            });
          }else{
            createProductFileClick({
              ...values,
              product_id,
            });
          }
        }}
        productFile={productFile}
        isLoading={loadingUpdate || loadingCreate}
      />
    </DialogDefault>
  );
};