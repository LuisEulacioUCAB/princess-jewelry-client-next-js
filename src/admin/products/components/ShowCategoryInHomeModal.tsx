import React from 'react';
import { useCallAction, useEvent } from '@cobuildlab/react-simple-state';
import {Divider} from '@material-ui/core';
import { DialogDefault } from '../../../../shared/components/dialogs/DialogDefault';
import { showSnackbar } from '../../../../shared/components/snackbar/snackbar-actions';
import { closeShowCategoryInHomeModel, updateCategory } from '../../categories/category-actions';
import { onShowCategoryInHomeModel } from '../../categories/category-events';

interface ShowCategoryInHomeModalProps{
  success: ()=> void;
}

export const ShowCategoryInHomeModal: React.FC<ShowCategoryInHomeModalProps> = (
  { success }
) =>{

  const { isOpen, category } = useEvent(onShowCategoryInHomeModel);
  const title = category?.show_in_home ? 'Hide category in home' : 'Show category in home';
  const [onCallUpdate, loading] = useCallAction(
    updateCategory,
    {
      onCompleted: () => {
        showSnackbar(
          'success',
          'Category updated successfully!'
        );
        closeShowCategoryInHomeModel();
        success();
      },
      onError: (error)=>{
        console.log('error', error);
        showSnackbar(
          'error',
          'Error to updated category!',
        );
      },
    },
  );


  return (
    <DialogDefault
      open={isOpen}
      title={title}
      onCancel={() => closeShowCategoryInHomeModel()}
      showDialogButtons
      buttonSubmitText='Accept'
      loading={loading}
      onSubmit={() => onCallUpdate({
        id: category.id,
        show_in_home: !category.show_in_home,
      })}
      maxWidth='sm'
      fullWidth
    >
      Are you sure to {category?.show_in_home ? 'hide': 'show'} this category in home page?
    </DialogDefault>
  );
};