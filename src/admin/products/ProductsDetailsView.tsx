import React from 'react';
import { useCallAction, useEvent, useFetchAction } from '@cobuildlab/react-simple-state';
import { useRouter } from 'next/router';
import {
  Grid,
  Hidden,
  Divider,
  Button,
  Box,
  CardContent,
  TypographyProps,
  FormControlLabel,
  Switch,
  withStyles,
  SwitchProps,
  SwitchClassKey
} from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import {
  fetchProduct,
  fetchProductFiles, fetchProductGraph,
  openAddEditProductFileModal,
  openDeleteProductFileModal, openProductGraphModal, selectedItem, updateProductFile,
} from './product-actions';
import { CardSection, TitleWithActions } from '../../../shared/components/card/CardSection';
import { MainLoader } from '../../../shared/components/MainLoader';
import { ProductInfoForm } from './components/ProductInfoForm';
import { AddEditProductModal } from './components/AddEditProductModal';
import { AddEditProductFileModal } from './components/AddEditProductFileModal';
import { ProjectCarousel } from './components/ProjectCarousel';
import { onSelectedFile } from './product-events';
import { validateIsPrincipalProductFile } from './product-utils';
import { showSnackbar } from '../../../shared/components/snackbar/snackbar-actions';
import { DeleteProductFileModal } from './components/DeleteProductFileModal';
import { ProductGraphModal } from './components/ProductGraphModal';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

const typographyProps: TypographyProps = {
  variant: 'subtitle1',
  color: 'secondary',
  style: { fontWeight: 'bold' },
};

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#D7B615',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#D7B615',
        border: '6px solid #D7B615',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: '1px solid #D7B615',
      backgroundColor: '#D7B615',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export const ProductsDetailsView: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { productFile } = useEvent(onSelectedFile);
  const [{ product }, loading, { refetch }] = useFetchAction(fetchProduct, [id]);

  const [
    { productFiles },
    loadingProjectFiles,
    { refetch: refetchProjectFiles },
  ] = useFetchAction(fetchProductFiles, [1, 100, id], {
    onCompleted: ({ productFiles: data }) => {
      if (data.length) selectedItem(data[0]);
    },
  });

  const [updateFile] = useCallAction(updateProductFile,{
    onCompleted: (data) => {
      showSnackbar(
        'success',
        data.principal ?
          `File ${productFile.file_name} is selected principal!` :
          `File ${productFile.file_name} is not principal!`
      );
      refetchProjectFiles();
    },
    onError: ()=>{
      showSnackbar(
        'error',
        'Error to updated file!',
      );
    },
  });

  return (
    <>
      <CardSection title={product?.name ?? ''}
        actions={[
          <Button onClick={() =>openProductGraphModal(product)} variant='outlined' size='large' color='secondary'>
            Graph
          </Button>,
          <Button
            onClick={() => openAddEditProductFileModal(undefined)}
            variant='contained'
            size='large'
            color='secondary'
          >
                       Add File
          </Button>
        ]}
      >
        {
          loading ? (
            <MainLoader />
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={5} lg={5}>
                <ProductInfoForm product={product} />
              </Grid>
              <Hidden mdDown>
                <Divider orientation='vertical' flexItem />
              </Hidden>
              <Grid item style={{ flexGrow: 1, paddingLeft: 0 }}>

                {
                  loadingProjectFiles ? (
                    <MainLoader />
                  ) : (
                    <>
                      <CardContent>
                        <TitleWithActions
                          title={`FILES: ${productFile?.file_name}`}
                          typographyProps={typographyProps}
                          actions={
                            [
                              <FormControlLabel
                                control={
                                  <IOSSwitch checked={Boolean(productFile?.principal)} onChange={()=>{

                                    const findProductFile = validateIsPrincipalProductFile(productFiles);

                                    if(findProductFile && findProductFile.id !== productFile.id){
                                      showSnackbar('error', 'Already was selected principal file!');
                                    }else {
                                      updateFile({
                                        file_name:productFile.file_name,
                                        principal:!productFile.principal,
                                        file_url:productFile.file_url,
                                        id:productFile.id,
                                        product_id:productFile.product.id,
                                      });
                                    }
                                  }} />}
                                label="Principal File"
                              />,
                              <Button
                                onClick={() => openAddEditProductFileModal(productFile)}
                                variant='outlined'
                                size='large'
                                color='secondary'
                              >
                                Edit
                              </Button>,
                              <Button
                                onClick={() => openDeleteProductFileModal(productFile)}
                                variant='outlined'
                                size='large'
                                color='secondary'
                              >
                                Delete
                              </Button>
                            ]
                          }
                        />
                        <Box mt={2}/>
                        <Divider />
                        <Box pt={2}>
                          <ProjectCarousel items={productFiles} />
                        </Box>
                      </CardContent>
                    </>
                  )
                }
              </Grid>
            </Grid>
          )
        }
      </CardSection>
      <AddEditProductModal success={() => refetch()} />
      <AddEditProductFileModal success={() => refetchProjectFiles()} />
      <DeleteProductFileModal success={() => refetchProjectFiles()}/>
      <ProductGraphModal/>
    </>
  );
};