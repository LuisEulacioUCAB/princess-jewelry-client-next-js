import React from 'react';
import { useCallAction, useEvent } from '@cobuildlab/react-simple-state';
import { DialogDefault } from '../../../../shared/components/dialogs/DialogDefault';
import { showSnackbar } from '../../../../shared/components/snackbar/snackbar-actions';
import { onDeleteProductFileModal } from '../product-events';
import {
 closeDeleteProductFileModal,
 deleteProductFile,
} from '../product-actions';
interface AddEditProductFileModalProps{
  success: ()=> void;
}

export const DeleteProductFileModal: React.FC<AddEditProductFileModalProps> = (
  { success }
) =>{

  const { isOpen, productFile } = useEvent(onDeleteProductFileModal);

  const [callDeleteProject, loading] = useCallAction(
    deleteProductFile,
    {
      onCompleted: () => {
        showSnackbar('success', 'Delete file successfully!');
        closeDeleteProductFileModal();
        success();
      },
      onError: ()=> showSnackbar('error', 'Error to delete file'),
    },
  );


  return (
    <DialogDefault
      open={isOpen}
      title='Delete File'
      onCancel={() => closeDeleteProductFileModal()}
      showDialogButtons
      buttonSubmitText='Delete'
      loading={loading}
      onSubmit={() => callDeleteProject(productFile.id)}
      maxWidth='sm'
      fullWidth
    >
      Are you sure to delete this file?
    </DialogDefault>
  );
};