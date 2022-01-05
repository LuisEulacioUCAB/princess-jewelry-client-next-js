import React from 'react';
import styled from 'styled-components';
import {
  createStyles,
  IconButton,
  makeStyles,
  TablePagination as MuiTablePagination,
  TablePaginationProps,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';

const useStyles1 = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    },
  }),
);

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      paddingLeft: 0,
    },
  }),
);

const StyledWrapperPagination = styled.div`
  display: flex;
  justify-content: center;
`;

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

/**
 *
 * @param {TablePaginationActionsProps} props - Props.
 * @returns {JSX.Element} TablePaginationActions.
 */
function TablePaginationActions(
  props: TablePaginationActionsProps,
): JSX.Element {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const from = count === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to =
    count !== -1 ? Math.min(count, page * rowsPerPage) : page * rowsPerPage;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    onChangePage(event, 1);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage)));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
      <Typography>
        {from}-{to} of {count}
      </Typography>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export const TablePagination: React.FC<TablePaginationProps> = (props) => {
  const { count, rowsPerPage, page, onChangePage } = props;

  const classes = useStyles();

  return (
    <StyledWrapperPagination>
      <MuiTablePagination
        component="div"
        classes={classes}
        rowsPerPageOptions={[]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        ActionsComponent={TablePaginationActions}
        labelDisplayedRows={() => null}
        onPageChange={()=>{}}
      />
    </StyledWrapperPagination>
  );
};
