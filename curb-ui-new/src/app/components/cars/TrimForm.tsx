'use client';

import {useEffect, useRef, useState} from 'react';
import {
  createCarMake,
  createCarModel, createCarTrim,
  createCarYear,
  getAllMakes,
  getAllModels, getAllTrims,
  getAllYears
} from '@/app/services/car-definitions';
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

export interface ITrimForm {
  yearId: number;
  onSelect?: (x: any) => any;
}

const SELECTED_COLOR = '#ccf';
const HEADER_NAME = 'Car Trim';

const TrimForm = (props: ITrimForm) => {
  const [yearsList, setYearsList] = useState<any>();
  const [inputShowing, setInputShowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number>(0);
  const {data: session} = useSession();
  const nameRef = useRef<any>('');
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadTrims = async () => {
    if (accessToken) {
      setLoading(true);
      setSelectedId(0);

      getAllTrims(accessToken, props.yearId)
        .then((res: any) => {
          setYearsList(res.makes);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setYearsList({});
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    reloadTrims().then(() => {});
  }, [session, props.yearId]);

  const addYear = () => {
    if (props.yearId === 0) {
      errorDialog('You must select a car year before adding a car trim.');
      return;
    }

    const name = nameRef.current.value.toString().trim();

    if (!name) {
      errorDialog(`${HEADER_NAME} cannot be empty.`);
      return;
    }

    createCarTrim(accessToken, props.yearId, name)
      .then(async (res: any) => {
        nameRef.current.value = '';
        setInputShowing(false);
        setSelectedId(0);
        await reloadTrims();
      })
      .catch((e) => {
        errorDialog('Unable to add car trim.');
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
                                 addYear();
                               }
                             }}/>
                </TableCell>
                <TableCell style={{ textAlign: 'right', padding: '0px', paddingRight: '5px' }}>
                  <Button variant={'contained'} onClick={() => addYear()}>ADD</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (<></>)}

          {yearsList?.length > 0 ? (
            <TableBody>
              {yearsList.map((x: any, count: number) =>
                <ArrowedTableRow value={x.name}
                                 key={count}
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

export default TrimForm;