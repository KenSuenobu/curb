import {IconButton, TableCell, TableHead, TableRow} from '@mui/material';
import {AddOutlined} from '@mui/icons-material';
import React from 'react';

export interface ITableHeader {
  header: string;
  onAdd?: () => any;
  onEdit?: () => any;
}

export const TableHeader = (props: ITableHeader) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ backgroundColor: '#ddd', borderBottom: '1px solid #000' }}>
          {props.header}
        </TableCell>
        <TableCell sx={{ backgroundColor: '#ddd',
                         textAlign: 'right',
                         borderRight: '1px solid #aaa',
                         borderBottom: '1px solid #000' }}>
          {props.onAdd && (
            <IconButton onClick={props.onAdd}
            style={{ padding: '0px' }}>
              <AddOutlined/>
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}