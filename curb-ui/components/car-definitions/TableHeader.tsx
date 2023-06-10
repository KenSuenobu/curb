import {IconButton, TableCell, TableHead, TableRow} from '@mui/material';
import {AddOutlined} from '@mui/icons-material';
import React from 'react';

export interface ITableHeader {
  header: string;
  onClick: () => any;
}

export const TableHeader = (props: ITableHeader) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ backgroundColor: '#ddd' }}>{props.header}</TableCell>
        <TableCell sx={{ backgroundColor: '#ddd', textAlign: 'right', borderRight: '1px solid #aaa' }}>
          <IconButton onClick={() => props.onClick()}>
            <AddOutlined/>
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}