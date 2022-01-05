import React from 'react';
import { Grid, Typography, Box , Button} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box:{
      marginBottom: theme.spacing(1)
    }
  })
);

export const ProductHorizontalItem: React.FC = ()=>{

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <img alt='product' src='https://picsum.photos/1200/600' width='100%' height='100%'/>
      </Grid>
      <Grid item xs={6}>
        <Box className={classes.box}>
          <Typography variant='h5'>Anillo</Typography>
        </Box>
        <Box className={classes.box}>
          <Typography variant='subtitle1'>Descripcion del producto</Typography>
        </Box>
        <Box className={classes.box}>
          <Button variant='contained' fullWidth>
            Comprar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};