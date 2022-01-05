import React from 'react';
import styled from 'styled-components';
import {
  makeStyles,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Popover,
} from '@material-ui/core';
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import { SelectTableRows } from './SelectTableRows';

// Default Props
const defaultConfigSearch = {
  fullWidth: false,
};

const defaultConfigSelectRows = {
  showSelectRows: true,
};

const useStyles = makeStyles(() => ({
  iconGray: {
    color: '#B2B2B2',
  },
  iconButton: {
    borderRadius: '50%',
    border: '1px solid #B2B2B2',
  },
}));

const PopoverContent = styled.div`
  padding: 20px;
  max-width: 445px;
`;

export interface TableFilterFormProps {
  numRows: number;
  onChangeRows: (value: number) => void;
  onSearchChange?: (value: string) => void;
  filters?: Record<string, string | number | null>;
  onChangeFilters?: (values: Record<string, string | number | null>) => void;
  filtersComponent?: React.ReactElement;
  configSearch?: {
    fullWidth?: boolean;
  };
  configSelectRows?: {
    showSelectRows?: boolean;
  };
}

export const TableFilterForm: React.FC<TableFilterFormProps> = (props) => {
  const {
    numRows,
    onChangeRows,
    onSearchChange,
    filtersComponent,
    configSearch,
    configSelectRows,
  } = props;
  const { fullWidth } = configSearch || defaultConfigSearch;
  const { showSelectRows } = configSelectRows || defaultConfigSelectRows;

  const [search, setSearch] = React.useState('');
  const [searchPerformed, setSearchPerformed] = React.useState(false);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleOpenFilters = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilters = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filters-popover' : undefined;

  return (
    <Grid container spacing={2} justify="flex-end" alignItems="center">
      {showSelectRows && (
        <Grid item>
          <SelectTableRows
            placeholder="rows"
            value={numRows}
            onChange={(e) => {
              onChangeRows(Number(e.target.value));
            }}
          />
        </Grid>
      )}
      {onSearchChange && (
        <Grid item xs={fullWidth ? 12 : 'auto'}>
          <TextField
            fullWidth={fullWidth}
            style={{ minWidth: 240 }}
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === '' && searchPerformed) {
                onSearchChange('');
                setSearchPerformed(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearchChange(search);
                setSearchPerformed(true);
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={classes.iconGray} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      )}
      {filtersComponent && (
        <Grid item>
          <IconButton
            aria-describedby={id}
            size="small"
            className={classes.iconButton}
            onClick={handleOpenFilters}
          >
            <FilterListIcon className={classes.iconGray} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseFilters}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <PopoverContent>{filtersComponent}</PopoverContent>
          </Popover>
        </Grid>
      )}
    </Grid>
  );
};
