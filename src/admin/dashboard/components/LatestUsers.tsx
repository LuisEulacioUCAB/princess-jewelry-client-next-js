import React from 'react';

import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell as MuiTableCell,
  withStyles,
  CardHeader, Typography,
} from '@material-ui/core';
import { useFetchAction } from '@cobuildlab/react-simple-state';
import { fetchLatestUsers } from '../../users/user-actions';
import { MainLoader } from '../../../../shared/components/MainLoader';

const TableCell = withStyles(() => ({
  head: {
    backgroundColor: 'transparent',
  },
}))(MuiTableCell);

export const LatestUsers: React.FC = ()=>{
  const [{ users }, loading] = useFetchAction(fetchLatestUsers,[1,5]);

  const tableBodyContent =
    users &&
    users.map((item, i) => (
      <TableRow key={`row-${i + 1}`}>
        <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
        <TableCell>{item.email}</TableCell>
      </TableRow>
    ));

  return (
    <Card elevation={0}>
      <CardHeader
        title={
          <Typography variant="h6">Ultimos Usuarios Registrados</Typography>
        }
      />
      <CardContent style={{ height:320 }}>
        <Table >
          {
            loading ? <MainLoader height='320px'>Loading...</MainLoader> :(
              <>
                <TableHead>
                  <TableRow>
                    <TableCell>NOMBRE COMPLETO</TableCell>
                    <TableCell>CORREO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{tableBodyContent}</TableBody>
              </>
            )
          }
        </Table>
      </CardContent>
    </Card>
  );
};