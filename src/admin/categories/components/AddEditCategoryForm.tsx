/* eslint-disable @typescript-eslint/no-explicit-any */
import React  from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { CategoryItem } from '../category-types';
import { ButtonDefault } from '../../../../shared/components/buttons/ButtonDefault';
import { closeAddEditCategoryModal } from '../category-actions';

const useStyles = makeStyles({
  buttonCancel: {
    marginRight: 5,
  },
  textFile: {
    marginLeft: 5,
    color: '#27428D',
    fontWeight: 'bold',
  },
});

type AddEditMeasurementAlertFormProps = {
  category?: CategoryItem;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
};

export const AddEditCategoryForm: React.FC<AddEditMeasurementAlertFormProps> = ({
  category,
  isLoading,
  onSubmit,
}) => {
  const { handleSubmit, control } = useForm();
  const classes = useStyles();


  const beforeSubmitValues = (values: any): void => {
    onSubmit(values);
  };


  return (
    <form onSubmit={handleSubmit(beforeSubmitValues)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue={category?.name}
            rules={{
              required: 'The category name is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                id="outlined-basic"
                label="Category name"
                variant="outlined"
                onChange={onChange}
                error={Boolean(error)}
                helperText={error && error.message}
                fullWidth
                color='secondary'
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <ButtonDefault
              variant="outlined"
              onClick={()=>closeAddEditCategoryModal()}
              className={classes.buttonCancel}
              color='secondary'
            >
              Cancel
            </ButtonDefault>
            <ButtonDefault type="submit" isLoading={isLoading}>
              {category ? 'Update' : 'Create'}
            </ButtonDefault>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
