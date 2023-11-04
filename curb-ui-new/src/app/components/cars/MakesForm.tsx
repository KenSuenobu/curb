'use client';

import {useEffect, useRef, useState} from 'react';
import {createCarMake, getAllMakes} from '@/app/services/car-definitions';
import { useSession } from 'next-auth/react';
import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {TableHeader} from '@/app/components/common/TableHeader';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {ArrowRightOutlined} from '@mui/icons-material';
import LoadingTable from '@/app/components/common/LoadingTable';
import ArrowedTableRow from '@/app/components/common/ArrowedTableRow';

export interface IMakesForm {
  onSelect?: (x: any) => any;
}

const SELECTED_COLOR = '#ccf';

const MakesForm = (props: IMakesForm) => {
  const [makesList, setMakesList] = useState<any>();
  const [inputShowing, setInputShowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number>(0);
  const makeRef = useRef<any>('');
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadMakes = async () => {
    if (accessToken) {
      setLoading(true);
      getAllMakes(accessToken)
        .then((res: any) => {
          setMakesList(res.makes);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  useEffect(() => {
    reloadMakes().then(() => {});
  }, [session]);

  const addMake = () => {
    const make = makeRef.current.value.toString().trim();

    if (!make) {
      errorDialog('Car make name is required');
      return;
    }

    createCarMake(accessToken, make)
      .then(async (res: any) => {
        makeRef.current.value = '';
        setInputShowing(false);
        setSelectedId(0);
        await reloadMakes();
      })
      .catch((e) => {
        errorDialog('Unable to add car make.');
      });
  }

  if (loading) {
    return <LoadingTable header={'Car Make'}/>;
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 400, border: '1px solid #ccc', width: '100%' }}>
        <Table stickyHeader size={'small'}>
          <TableHeader header={'Car Make'}
                       onAdd={() => setInputShowing(!inputShowing)}
                       onEdit={() => {}}/>
          {inputShowing ? (
            <>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField id={'namespace'}
                               variant={'outlined'}
                               inputRef={makeRef}
                               required autoFocus fullWidth
                               onKeyDown={(ev) => {
                                 if (ev.key === 'Escape') {
                                   setInputShowing(false);
                                   makeRef.current.value = '';
                                 } else if (ev.key === 'Enter') {
                                   addMake();
                                 }
                               }}/></TableCell>
                  <TableCell>
                    <Button variant={'contained'} onClick={() => addMake()}>ADD</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          ) : (
            <>
            </>
          )}
          {makesList?.length > 0 ? (
            <TableBody>
              {makesList.map((x: any) => {
                  const bgColor = selectedId === x.id ? SELECTED_COLOR : '#fff';

                  return <ArrowedTableRow value={x.name} bgColor={bgColor} onClick={() => {
                    setSelectedId(x.id);
                    if (props.onSelect) {
                      props.onSelect(x);
                    }
                  }}/>;
                })}
            </TableBody>
          ) : (
            <>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    <p style={{ padding: '4px'}}>
                      Empty list.
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  )
}

export default MakesForm;