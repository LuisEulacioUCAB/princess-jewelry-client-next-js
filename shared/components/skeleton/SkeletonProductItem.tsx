import React from 'react';
import { GridSize, Grid, Card, Divider, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() =>
  createStyles({
    productName: {
      textTransform:'uppercase',
      fontWeight:500,
      height:45
    },
  }),
);

interface SkeletonProductItemProps{
  cols: GridSize | boolean;
}

export const SkeletonProductItem: React.FC<SkeletonProductItemProps> = (
  { cols }
)=>{

  const classes = useStyles();

  return (
    <Grid item xs={cols}>
      <Card elevation={0} style={{ cursor:'pointer' }}>
        <Skeleton variant="rect" width='100%' height={272}/>
        <Divider/>
        <CardContent>
          <Typography variant='subtitle2' className={classes.productName}>
            <Skeleton variant="text" />
          </Typography>
          <Typography variant='caption'>
            <Skeleton variant="text" />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};