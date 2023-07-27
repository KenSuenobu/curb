import {Checkbox, TableCell, TableRow} from '@mui/material';

export interface ICheckboxTableRow {
  value: string;
  checked: boolean;
  onClick: () => void;
}

const CheckboxTableRow = (props: ICheckboxTableRow) => {
  return (
    <TableRow hover onClick={() => props.onClick()}>
      <TableCell>
        <Checkbox checked={props.checked}/>
      </TableCell>
      <TableCell sx={{ color: '#000' }}>{props.value}</TableCell>
    </TableRow>
  );
}

export default CheckboxTableRow;
