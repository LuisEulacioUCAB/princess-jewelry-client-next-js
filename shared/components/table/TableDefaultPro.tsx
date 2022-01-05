import React, { PropsWithChildren } from 'react';
import {
  makeStyles,
  Checkbox,
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { MainLoader } from '../MainLoader';
import { TableFilterForm } from './TableFilterForm';
import { TablePagination } from './TablePagination';
import { TableActionsMenu } from './TableActionsMenu';
import { MenuActionType, IdObj } from './table-types';

const useStyles = makeStyles(() => ({
  containerTable: {
    '&::-webkit-scrollbar': {
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#DADCE4',
      borderRadius: '10px',
      width: '30%',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
  containerMuiTable: {
    width: '100%',
  },
}));

interface TableColumnType<T> {
  columnName: string | React.ReactNode;
  columnValue: ((item: T, index: number) => string | number) | null;
  columnComponent?: (item: T, index: number) => React.ReactElement;
}

interface FiltersType {
  [key: string]: string | number | null;
}

interface TableDefaultProProps<T> {
  page: number;
  pageSize: number;
  onChangePageSize: (value: number) => void;
  onChangeSearch?: (value: string) => void;
  onChangePage: (value: number) => void;
  filters?: FiltersType;
  onChangeFilters?: (values: Record<string, string | number | null>) => void;
  totalItems: number;
  items: T[];
  filtersComponent?: React.ReactElement;
  columns: TableColumnType<T>[];
  actions?: MenuActionType<T>[];
  hasSelection?: boolean;
  selectedItems?: string[];
  onSelectItem?: (values: string[]) => void;
  onSelectAll?: () => void;
  loading: boolean;
  messageLoading: string;
  configs?: {
    configSearch?: { fullWidth?: boolean };
    configSelectRows?: { showSelectRows?: boolean };
  };
}

export const TableDefaultPro = <T extends IdObj>(
  props: PropsWithChildren<TableDefaultProProps<T>>,
): JSX.Element => {
  const {
    page,
    pageSize,
    onChangePageSize,
    onChangeSearch,
    onChangePage,
    filters,
    onChangeFilters,
    totalItems,
    items,
    actions,
    filtersComponent,
    columns,
    loading,
    messageLoading,
    hasSelection = false,
    selectedItems,
    onSelectItem,
    onSelectAll,
    configs,
  } = props;

  const classes = useStyles();
  const numSelected = selectedItems?.length || 0;
  const [pagesSelected, setPagesSelected] = React.useState<number[]>([]);
  const itemsIds = items.map((item) => item.id || '');

  let totalColumns = columns.length;
  let tableHead = columns.map((column) => (
    <TableCell>{column.columnName}</TableCell>
  ));

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (selectedItems && onSelectItem && onSelectAll) {
      if (event.target.checked) {
        // const newSelecteds = itemsIds.filter(
        //   (itemId) => selectedItems.indexOf(itemId) === -1,
        // );
        // onSelectItem([...selectedItems, ...newSelecteds]);
        // const isNewPage = pagesSelected.indexOf(page) === -1;
        // if (isNewPage) setPagesSelected([...pagesSelected, page]);
        onSelectAll();
        return;
      }
      onSelectItem([]);
      // setPagesSelected(
      //   pagesSelected.filter((pageSelected) => pageSelected !== page),
      // );
      // onSelectItem(
      //   selectedItems.filter(
      //     (selectedItem) => itemsIds.indexOf(selectedItem) === -1,
      //   ),
      // );
    }
  };

  if (hasSelection && selectedItems) {
    totalColumns += 1;

    const numSelectedCurrentPage = selectedItems.filter(
      (sItem) => itemsIds.indexOf(sItem) !== -1,
    ).length;
    const isIndeterminate =
      numSelected > 0 && numSelectedCurrentPage < items.length;
    const isChecked =
      items.length > 0 && numSelectedCurrentPage === items.length;

    const cellHeadCheckbox = (
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={isIndeterminate}
          checked={isChecked}
          onChange={(e) => handleSelectAllClick(e)}
          inputProps={{ 'aria-label': 'select all desserts' }}
        />
      </TableCell>
    );
    tableHead = [cellHeadCheckbox, ...tableHead];
  }

  if (actions && actions.length > 0) {
    totalColumns += 1;
    tableHead.push(<TableCell align="center">Actions</TableCell>);
  }

  const handleSelectItem = (
    event: React.MouseEvent<unknown>,
    itemId: string,
  ): void => {
    if (selectedItems && onSelectItem) {
      const selectedIndex = selectedItems.indexOf(itemId);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedItems, itemId);
        const isNewPage = pagesSelected.indexOf(page) === -1;
        if (isNewPage) setPagesSelected([...pagesSelected, page]);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedItems.slice(1));
        const isDeselectedAllItems =
          newSelected.filter((element) => itemsIds.indexOf(element) !== -1)
            .length === 0;
        if (isDeselectedAllItems)
          setPagesSelected(
            pagesSelected.filter((pageSelected) => pageSelected !== page),
          );
      } else if (selectedIndex === selectedItems.length - 1) {
        newSelected = newSelected.concat(selectedItems.slice(0, -1));
        const isDeselectedAllItems =
          newSelected.filter((element) => itemsIds.indexOf(element) !== -1)
            .length === 0;
        if (isDeselectedAllItems)
          setPagesSelected(
            pagesSelected.filter((pageSelected) => pageSelected !== page),
          );
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedItems.slice(0, selectedIndex),
          selectedItems.slice(selectedIndex + 1),
        );
        const isDeselectedAllItems =
          newSelected.filter((element) => itemsIds.indexOf(element) !== -1)
            .length === 0;
        if (isDeselectedAllItems)
          setPagesSelected(
            pagesSelected.filter((pageSelected) => pageSelected !== page),
          );
      }
      onSelectItem(newSelected);
    }
  };

  const isSelected = (itemId: string): boolean =>
    (selectedItems || []).indexOf(itemId) !== -1;

  const tableBody = loading ? (
    <TableRow>
      <TableCell colSpan={totalColumns}>
        <MainLoader height="300px">{messageLoading}</MainLoader>
      </TableCell>
    </TableRow>
  ) : (
    <>
      {items.map((item, i) => {
        const index = i + 1;
        let columnsData = columns.map((column) => {
          if (column.columnValue !== null) {
            return <TableCell>{column.columnValue(item, index)}</TableCell>;
          }
          if (column.columnComponent)
            return <TableCell>{column.columnComponent(item, index)}</TableCell>;
          return null;
        });

        if (hasSelection) {
          const cellCheckbox = (
            <TableCell padding="checkbox">
              <Checkbox
                checked={isSelected(item.id || '')}
                inputProps={{ 'aria-label': 'select all items' }}
              />
            </TableCell>
          );
          columnsData = [cellCheckbox, ...columnsData];
        }

        if (actions && actions.length > 0) {
          columnsData.push(
            <TableCell align="center">
              <TableActionsMenu item={item} actions={actions} />
            </TableCell>,
          );
        }
        return (
          <TableRow
            hover
            onClick={(event) => handleSelectItem(event, item.id || '')}
            role="checkbox"
            aria-checked={isSelected(item.id || '')}
            tabIndex={-1}
            key={item.id}
            selected={isSelected(item.id || '')}
          >
            {columnsData}
          </TableRow>
        );
      })}
    </>
  );

  return (
    <>
      <TableFilterForm
        numRows={pageSize}
        onChangeRows={onChangePageSize}
        onSearchChange={onChangeSearch}
        filters={filters}
        onChangeFilters={onChangeFilters}
        filtersComponent={filtersComponent}
        configSearch={configs ? configs.configSearch : undefined}
        configSelectRows={configs ? configs.configSelectRows : undefined}
      />
      <br />
      <TableContainer className={classes.containerTable}>
        <MuiTable className={classes.containerMuiTable}>
          <TableHead color='secondary'>
            <TableRow>{tableHead}</TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </MuiTable>
      </TableContainer>
      <br />
      <TablePagination
        count={totalItems}
        page={page}
        rowsPerPage={pageSize}
        onChangePage={(e, newPage) => onChangePage(newPage)}
        onPageChange={()=>{}}
      />
    </>
  );
};
