'use client';

import {useEffect, useRef, useState} from 'react';
import {createCarMake, getAllMakes} from '@/app/services/car-definitions';
import { useSession } from 'next-auth/react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import {TableHeader} from '@/app/components/common/TableHeader';
import {errorDialog} from '@/app/components/common/ConfirmDialog';
import LoadingTable from '@/app/components/common/LoadingTable';
import ArrowedTableRow from '@/app/components/common/ArrowedTableRow';

export interface IMakesForm {
  onSelect?: (x: any) => any;
}

const SELECTED_COLOR = '#ccf';
const HEADER_NAME = 'Car Make';

const MakesForm = (props: IMakesForm) => {
  const [makesList, setMakesList] = useState<any>();
  const [inputShowing, setInputShowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number>(0);
  const {data: session} = useSession();
  const nameRef = useRef<any>('');
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
          setMakesList({});
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    reloadMakes().then(() => {});
  }, [session]);

  const addMake = () => {
    const make = nameRef.current.value.toString().trim();

    if (!make) {
      errorDialog(`${HEADER_NAME} name cannot be empty.`);
      return;
    }

    createCarMake(accessToken, make)
      .then(async (res: any) => {
        nameRef.current.value = '';
        setInputShowing(false);
        setSelectedId(0);
        await reloadMakes();
      })
      .catch((e) => {
        errorDialog('Unable to add car make.');
      });
  }

  const cellClicked = (x: any) => {
    setSelectedId(x.id);
    props.onSelect && props.onSelect(x);
  }

  const toggleInput = () => setInputShowing(!inputShowing);

  if (loading) {
    return <LoadingTable header={HEADER_NAME}/>;
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 400, border: '1px solid #ccc', width: '100%' }}>
        <Table stickyHeader size={'small'}>
          <TableHeader header={HEADER_NAME}
                       onAdd={toggleInput}/>

          {inputShowing ? (
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField id={'namespace'}
                             variant={'standard'}
                             inputRef={nameRef}
                             required autoFocus fullWidth
                             placeholder={`${HEADER_NAME} name`}
                             onKeyDown={(ev) => {
                               if (ev.key === 'Escape') {
                                 setInputShowing(false);
                                 nameRef.current.value = '';
                               } else if (ev.key === 'Enter') {
                                 addMake();
                               }
                             }}/>
                </TableCell>
                <TableCell style={{ textAlign: 'right', padding: '0px', paddingRight: '5px' }}>
                  <Button variant={'contained'} onClick={() => addMake()}>ADD</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (<></>)}

          {makesList?.length > 0 ? (
            <TableBody>
              {makesList.map((x: any) =>
                <ArrowedTableRow value={x.name}
                                 bgColor={(selectedId === x.id ? SELECTED_COLOR : '#fff')}
                                 onClick={() => cellClicked(x)}/>
              )}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <p style={{ padding: '4px'}}>
                    Empty list.
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  )
}

export default MakesForm;