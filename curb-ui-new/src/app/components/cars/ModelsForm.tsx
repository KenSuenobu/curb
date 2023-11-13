'use client';

import {useEffect, useRef, useState} from 'react';
import {createCarMake, createCarModel, getAllMakes, getAllModels} from '@/app/services/car-definitions';
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

export interface IModelsForm {
  makeId: number;
  onSelect?: (x: any) => any;
}

const HEADER_NAME = 'Car Model';

const ModelsForm = (props: IModelsForm) => {
  const [modelsList, setModelsList] = useState<any>();
  const [inputShowing, setInputShowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number>(0);
  const {data: session} = useSession();
  const nameRef = useRef<any>('');
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadModels = async () => {
    if (accessToken) {
      setLoading(true);
      setSelectedId(0);

      getAllModels(accessToken, props.makeId)
        .then((res: any) => {
          setModelsList(res.makes);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setModelsList({});
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    reloadModels().then(() => {});
  }, [session, props.makeId]);

  const addModel = () => {
    if (props.makeId === 0) {
      errorDialog('You must select a car make before adding a car model.');
      return;
    }

    const model = nameRef.current.value.toString().trim();

    if (!model) {
      errorDialog(`${HEADER_NAME} name cannot be empty.`);
      return;
    }

    createCarModel(accessToken, props.makeId, model)
      .then(async (res: any) => {
        nameRef.current.value = '';
        setInputShowing(false);
        setSelectedId(0);
        await reloadModels();
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
                                 addModel();
                               }
                             }}/>
                </TableCell>
                <TableCell style={{ textAlign: 'right', padding: '0px', paddingRight: '5px' }}>
                  <Button variant={'contained'} onClick={() => addModel()}>ADD</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (<></>)}

          {modelsList?.length > 0 ? (
            <TableBody>
              {modelsList.map((x: any, count: number) =>
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

export default ModelsForm;