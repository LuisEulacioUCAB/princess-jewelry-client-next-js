import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import { MenuActionType, IdObj } from './table-types';

interface TableActionsMenuProps<T> {
  actions: MenuActionType<T>[];
  item: T;
}

export const TableActionsMenu = <T extends IdObj>(
  props: React.PropsWithChildren<TableActionsMenuProps<T>>,
): JSX.Element => {
  const { actions, item } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openClientMenu = Boolean(anchorEl);

  const handleOpenClientMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget);

  const handleCloseClientMenu = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenClientMenu} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={openClientMenu}
        onClose={handleCloseClientMenu}
      >
        {actions.map((action) => (
          <MenuItem
            onClick={() => {
              action.onClick(item);
              handleCloseClientMenu();
            }}
          >
            {typeof action.actionName === 'function'
              ? action.actionName(item)
              : action.actionName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
