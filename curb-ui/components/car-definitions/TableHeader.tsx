import {IconButton, TableCell, TableHead, TableRow} from '@mui/material';
import {AddOutlined, EditOutlined} from '@mui/icons-material';
import React from 'react';

export interface ITableHeader {
  header: string;
  onAdd: () => any;
  onEdit: () => any;
}

export const TableHeader = (props: ITableHeader) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ backgroundColor: '#ddd' }}>{props.header}</TableCell>
        <TableCell sx={{ backgroundColor: '#ddd', textAlign: 'right', borderRight: '1px solid #aaa' }}>
          <IconButton onClick={() => props.onAdd()}>
            <AddOutlined/>
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}