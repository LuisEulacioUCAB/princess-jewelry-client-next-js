/* eslint-disable @typescript-eslint/no-explicit-any */
import React  from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box, FormControl,
  Grid,
  makeStyles,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';
import { useFetchAction } from '@cobuildlab/react-simple-state';
import { ProductItem } from '../product-types';

import { ButtonDefault } from '../../../../shared/components/buttons/ButtonDefault';
import { closeAddEditProductModal } from '../product-actions';
import { CURRENCY } from '../../../constants';
import { fetchCategories } from '../../categories/category-actions';

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
  product?: ProductItem;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
};

export const AddEditProductForm: React.FC<AddEditMeasurementAlertFormProps> = ({
  product,
  isLoading,
  onSubmit,
}) => {
  const { handleSubmit, control } = useForm();
  const classes = useStyles();


  const beforeSubmitValues = (values: any): void => {

    onSubmit({ ...values, price: parseInt(values.price), stock: parseInt(values.stock) });
  };

  const [{ categories }] = useFetchAction(fetchCategories,[1, 1000]);

  return (
    <form onSubmit={handleSubmit(beforeSubmitValues)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue={product?.name}
            rules={{
              required: 'The product name is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                id="outlined-basic"
                label="Product name"
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
          <Controller
            name="category_id"
            control={control}
            rules={{
              required: 'The category is required',
            }}
            defaultValue={product?.category.id}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-multiple-category-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-category-label"
                  id="demo-multiple-category-label"
                  value={value}
                  label="Category"
                  onChange={onChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText error={Boolean(error)}>
                  <>{error && error.message}</>
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue={product?.description}
            rules={{
              required: 'The description is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                onChange={onChange}
                error={Boolean(error)}
                helperText={error && error.message}
                fullWidth
                color='secondary'
                multiline
                rows={4}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="price"
            control={control}
            defaultValue={product?.price}
            rules={{
              required: 'The price is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                id="outlined-basic"
                label="Price"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChange}
                error={Boolean(error)}
                helperText={error && error.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <Controller
            name="currency"
            control={control}
            rules={{
              required: 'The currency is required',
            }}
            defaultValue={product?.currency}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-multiple-currency-label">
                  Currency
                </InputLabel>
                <Select
                  labelId="demo-multiple-weekday-label"
                  id="demo-multiple-weekday"
                  value={value}
                  label="Currency"
                  onChange={onChange}
                >
                  {CURRENCY.map((curr) => (
                    <MenuItem value={curr.key}>
                      {curr.label}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText error={Boolean(error)}>
                  <>{error && error.message}</>
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="stock"
            control={control}
            defaultValue={product?.stock}
            rules={{
              required: 'The stock is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                id="outlined-basic"
                label="Stock"
                variant="outlined"
                type="number"
                onChange={(e) => {
                  if (parseInt(e.target.value) >= 0) onChange(e);
                }}
                error={Boolean(error)}
                helperText={error && error.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <ButtonDefault
              variant="outlined"
              onClick={()=>closeAddEditProductModal()}
              className={classes.buttonCancel}
              color='secondary'
            >
              Cancel
            </ButtonDefault>
            <ButtonDefault type="submit" isLoading={isLoading}>
              {product ? 'Update' : 'Create'}
            </ButtonDefault>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
