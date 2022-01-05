import React from 'react';
import {
  Container,
  Grid,
  Theme,
  List,
  Checkbox,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider, Typography,
  TextField,
  InputAdornment,
  Box
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useEvent } from '@cobuildlab/react-simple-state';
import { useRouter } from 'next/router';
import { Search as SearchIcon } from '@material-ui/icons';
import { fetchCategoriesEvent } from '../../src/admin/categories/category-events';
import { onChangeSearch } from '../../src/home/home-events';
import { changeSearch } from '../../src/home/home-actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: theme.spacing(6),
      paddingTop: theme.spacing(6),
      minHeight: 600,
    },
    list: {
      backgroundColor: '#fff',
    },
    categoryTitle: {
      fontWeight: 'bold',
      podding: theme.spacing(1),
      textTransform: 'uppercase',
    },
  }),
);

export const LayoutProducts: React.FC = ({
  children,
}) => {
  const router = useRouter();
  const { category: slug } = router.query;
  const { categories } = useEvent(fetchCategoriesEvent);
  const { search } = useEvent(onChangeSearch);
  const selectedCategory = slug ? categories.find((cat) => {
    return cat?.slug === slug;
  }) : null;
  const [searchParam, setSearchParam] = React.useState<string>(search);

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container spacing={6}>
        <Grid item xs={3}>
          <List dense className={classes.list}>
            <ListItem>
              <ListItemText primary={
                <Typography className={classes.categoryTitle}>Categorias</Typography>
              } />
            </ListItem>
            <Divider />
            <ListItem
              key={-1}
              button selected={!selectedCategory}
              onClick={() => router.push('/products')}
            >
              <ListItemIcon>
                <Checkbox
                  edge='end'
                  checked={!selectedCategory}
                  inputProps={{ 'aria-labelledby': 'all' }}
                />
              </ListItemIcon>
              <ListItemText primary='Todas' />
            </ListItem>
            {
              categories?.map((category) => {

                const selected = selectedCategory && selectedCategory.id && selectedCategory.id === category.id;
                return (
                  <ListItem
                    key={category.id}
                    button selected={selected}
                    onClick={() => {
                      router.push(`/products/${category.slug}`);
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge='end'
                        checked={selected}
                        inputProps={{ 'aria-labelledby': category.slug }}
                      />
                    </ListItemIcon>
                    <ListItemText id={category.slug} primary={category.name} />
                  </ListItem>
                );
              })
            }
          </List>

        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box width='100%' textAlign='right'>
                <TextField
                  label='Buscar'
                  id='standard-start-adornment'
                  color='secondary'
                  variant='outlined'
                  value={searchParam}
                  onChange={(e)=> {
                    setSearchParam(e.target.value as string);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      changeSearch(searchParam);
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};