'use client';

import {useEffect, useRef, useState} from 'react';
import {
  createCarMake,
  createCarModel,
  createCarYear,
  getAllMakes,
  getAllModels,
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
import {SELECTED_COLOR} from '@/app/components/common/ColorDatabase';

export interface IYearsForm {
  modelId: number;
  onSelect?: (x: any) => any;
}

const HEADER_NAME = 'Car Year';

const YearsForm = (props: IYearsForm) => {
  const [yearsList, setYearsList] = useState<any>();
  const [inputShowing, setInputShowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number>(0);
  const {data: session} = useSession();
  const nameRef = useRef<any>('');
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadYears = async () => {
    if (accessToken) {
      setLoading(true);
      setSelectedId(0);

      getAllYears(accessToken, props.modelId)
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
    reloadYears().then(() => {});
  }, [session, props.modelId]);

  const addYear = () => {
    if (props.modelId === 0) {
      errorDialog('You must select a car model before adding a car year.');
      return;
    }

    const year = nameRef.current.value.toString().trim();

    if (!year) {
      errorDialog(`${HEADER_NAME} cannot be empty.`);
      return;
    }

    createCarYear(accessToken, props.modelId, year)
      .then(async (res: any) => {
        nameRef.current.value = '';
        setInputShowing(false);
        setSelectedId(0);
        await reloadYears();
      })
      .catch((e) => {
        errorDialog('Unable to add car year.');
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
                <ArrowedTableRow value={x.year}
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

export default YearsForm;