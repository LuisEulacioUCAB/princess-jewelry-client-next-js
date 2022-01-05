import React from 'react';

import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell as MuiTableCell,
  withStyles,
  CardHeader,
} from '@material-ui/core';

const TableCell = withStyles(() => ({
  head: {
    backgroundColor: 'transparent',
  },
}))(MuiTableCell);

const data:{ product: string; count:number }[] = [
  {
    product:'Product 1',
    count:3
  },

  {
    product:'Product 1',
    count:10
  },

  {
    product:'Product 1',
    count:7
  },

  {
    product:'Product 1',
    count:4
  },

  {
    product:'Product 1',
    count:1
  }
];

export const LatestProductsBuyer: React.FC = ()=>{

  const tableBodyContent =
    data &&
    data.map((item, i) => (
      <TableRow key={`row-${i + 1}`}>
        <TableCell>{item.product}</TableCell>
        <TableCell>{item.count}</TableCell>
      </TableRow>
    ));

  return (
    <Card elevation={0}>
      <CardHeader
        title={
          <Typography variant="h6">Ultimos Productos Comprados</Typography>
        }
      />
      <CardContent style={{ height:320 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PRODUCTO</TableCell>
              <TableCell>CANTIDAD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBodyContent}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};