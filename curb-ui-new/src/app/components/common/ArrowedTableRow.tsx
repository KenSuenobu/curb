import {TableCell, TableRow, Typography} from '@mui/material';
import {ArrowRightOutlined} from '@mui/icons-material';

export interface IArrowedTableRow {
  value: string;
  bgColor: any;
  onClick: () => any;
}

const ArrowedTableRow = (props: IArrowedTableRow) => {
  return (
    <TableRow hover sx={{ cursor: 'pointer' }}>
      <TableCell
        sx={{ backgroundColor: props.bgColor, width: '90%' }}
        onClick={props.onClick}><Typography>{props.value}</Typography></TableCell>
      <TableCell
        onClick={props.onClick}
        sx={{ textAlign: 'right', backgroundColor: props.bgColor, width: '10%', paddingRight: '5px' }}>
        <ArrowRightOutlined/>
      </TableCell>
    </TableRow>
  );
}

export default ArrowedTableRow;