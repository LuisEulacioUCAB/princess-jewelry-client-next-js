import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Box, Typography } from '@material-ui/core';
import { ProductFileItem } from '../product-types';
import { selectedItem } from '../product-actions';

interface ProjectCarouselProps{
  items: ProductFileItem[];
}

const Item: React.FC<{ item: ProductFileItem }> = ({ item }) =>
  (
    <Grid item xs={12} key='content'>
      <Box width='100%' textAlign='center'>
        <img src={`http://localhost:8000/${item?.file_url}`} alt={item?.file_name} height={350} width='auto'/>
      </Box>
    </Grid>
  );

export const ProjectCarousel: React.FC<ProjectCarouselProps> = (
  { items }
)=>{
  return items.length ? (
    <Carousel
      navButtonsAlwaysVisible
      autoPlay={false}
      indicators={false}
      onChange={(index)=> selectedItem(items[index])
      }
    >
      {
        items.map((item) => <Item item={item} />)
      }
    </Carousel>
  ): <Typography variant='subtitle1'>

    The product don't have files
  </Typography>;
};