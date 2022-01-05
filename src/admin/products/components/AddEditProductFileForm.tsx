/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{ useState}  from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Grid,
  makeStyles,
  TextField,
  FormHelperText,
  Button,
  Typography
} from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { ProductFileItem } from '../product-types';
import { ButtonDefault } from '../../../../shared/components/buttons/ButtonDefault';
import { closeAddEditProductFileModal } from '../product-actions';


const useStyles = makeStyles({
  buttonCancel: {
    marginRight: 5,
  },
  textFile: {
    marginLeft: 5,
    color: '#D7B615',
    fontWeight: 'bold',
  },
});

type AddEditProductFileFormProps = {
  productFile?: ProductFileItem;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
};

export const AddEditProductFileForm: React.FC<AddEditProductFileFormProps> = ({
  productFile,
  isLoading,
  onSubmit,
}) => {
  const { handleSubmit, control ,setValue } = useForm();
  const classes = useStyles();
  const [fileName, setFileName] = React.useState(() => {
    if (productFile && productFile.original_name) {
      return productFile.original_name;
    }
    return '';
  });
  const [showFileError, setShowFileError] = useState<boolean>(false);
  const beforeSubmitValues = (values: any): void => {
    if (!fileName) {
      setShowFileError(true);
      return;
    }
    onSubmit({ ...values });
  };

  return (
    <form onSubmit={handleSubmit(beforeSubmitValues)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="file_name"
            control={control}
            defaultValue={productFile?.file_name}
            rules={{
              required: 'The product name is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                id="outlined-basic"
                label="File name"
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
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUpload />}
            size='large'
          >
            Upload File
            <input
              hidden
              type="file"
              name="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  setValue('file', file);
                  setFileName(file.name);
                }
              }}
            />
          </Button>
          {showFileError && (
            <Box pt={1}>
              <FormHelperText error>The file is required</FormHelperText>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={classes.textFile}
            component="span"
            variant="subtitle1"
          >
            {fileName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <ButtonDefault
              variant="outlined"
              onClick={()=>closeAddEditProductFileModal()}
              className={classes.buttonCancel}
              color='secondary'
            >
              Cancel
            </ButtonDefault>
            <ButtonDefault type="submit" isLoading={isLoading}>
              {productFile ? 'Update' : 'Create'}
            </ButtonDefault>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
