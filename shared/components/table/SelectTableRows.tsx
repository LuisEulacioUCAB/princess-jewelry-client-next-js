import React from 'react';
import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';

export const SelectTableRows: React.FC<TextFieldProps> = (props) => (
  <TextField label="rows" variant='outlined' select {...props}>
    <MenuItem value={3}>3 Row(s)</MenuItem>
    <MenuItem value={5}>5 Row(s)</MenuItem>
    <MenuItem value={10}>10 Row(s)</MenuItem>
    <MenuItem value={15}>15 Row(s)</MenuItem>
  </TextField>
);

SelectTableRows.defaultProps = {
  style: { minWidth: 140 },
  defaultValue: 3,
};
