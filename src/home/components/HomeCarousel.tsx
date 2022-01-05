import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Box, Typography } from '@material-ui/core';

interface ImageProps {
  title: string;
  url: string;
}

interface ItemProps {
  name: string;
  description: string
  image: ImageProps
}

const items: ItemProps[] = [
  {
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!',
    image: {
      title: 'Macbook Pro',
      url: '/banner.png',
    },
  },
  {
    name: 'Random Name #2',
    description: 'Hello World!',
    image: {
      title: 'Macbook Pro',
      url: '/banner.png',
    },
  },
];

export const Item: React.FC<{ item: ItemProps }> = ({ item }) =>
  (
    <Grid item xs={12} key='content'>
      <img src={item.image.url} alt={item.image.title} height='auto' width='100%'/>
    </Grid>
  );

export const HomeCarousel: React.FC = () => (
  <Box height={760}>
    <Carousel
      next={(now: string, previous: string) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
      prev={(now: string, previous: string) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
      navButtonsAlwaysVisible
      autoPlay={false}
      indicators={false}
    >
      {
        items.map((item) => <Item item={item} />)
      }
    </Carousel>
  </Box>
);