import {LinearProgress, Table, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import {TableHeader} from '@/app/components/common/TableHeader';

export interface ILoadingTable {
  header: string;
}

const LoadingTable = (props: ILoadingTable) => {
  return (
    <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
      <Table stickyHeader size={'small'}>
        <TableHeader header={props.header}/>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <LinearProgress/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LoadingTable;