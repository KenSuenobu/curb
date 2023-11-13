import {Button, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {useSession} from 'next-auth/react';
import ArrowedTableRow from '@/app/components/common/ArrowedTableRow';
import {TableHeader} from '@/app/components/common/TableHeader';
import {createFleet, getAllFleets} from '@/app/services/fleet';
import LoadingTable from '@/app/components/common/LoadingTable';
import {errorDialog} from '@/app/components/common/ConfirmDialog';

export interface IFleetList {
  addable?: boolean;
  onClick: (x: any) => any;
}

const SELECTED_COLOR = '#ccf';
const HEADER_NAME = 'Fleet';

const FleetList = (props: IFleetList) => {
  const [inputShowing, setInputShowing] = useState(false);
  const [fleetList, setFleetList] = useState<any[]>([]);
  const [fleetId, setFleetId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const fleetRef = useRef<any>('');
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadFleets = () => {
    if (accessToken) {
      setLoading(true);
      getAllFleets(accessToken)
        .then((x: any) => {
          setFleetList(x.fleets ?? []);
          setLoading(false);
          setFleetId(0);
        })
        .catch((x) => {
          setFleetList([]);
          setLoading(false);
          setFleetId(0);
        });
    }
  }

  const toggleInput = () => setInputShowing(!inputShowing);

  useEffect(() => {
    reloadFleets();
  }, [accessToken]);

  const addFleet = () => {
    const fleetName = fleetRef.current.value.trim();

    if (fleetName.length === 0) {
      errorDialog('Fleet name is required.');
      return;
    }

    createFleet(accessToken, fleetName)
      .then((x: any) => {
        reloadFleets();
      })
      .catch((x) => {
        errorDialog(`Failed to add fleet: ${x.message}`);
      });
  }

  const selectFleetItem = (x: any) => {
    setFleetId(x.id);
    props.onClick(x);
  }

  if (loading) {
    return <LoadingTable header={HEADER_NAME}/>;
  }

  return (
    <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
      <Table stickyHeader size={'small'}>
        {props.addable !== false ? (
          <TableHeader header={HEADER_NAME}
                       onAdd={toggleInput}/>
          ) : (
          <TableHeader header={HEADER_NAME}/>
          )
        }
        {inputShowing ? (
          <>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField id={'namespace'} variant={'standard'} required inputRef={fleetRef}
                             autoFocus fullWidth
                             placeholder={'Fleet Name'}
                             onKeyDown={(ev) => {
                               if (ev.key === 'Escape') {
                                 setInputShowing(false);
                                 fleetRef.current.value = '';
                               } else if (ev.key === 'Enter') {
                                 addFleet();
                               }
                             }}/></TableCell>
                <TableCell>
                  <Button variant={'contained'} onClick={addFleet}>ADD</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </>
        ) : (
          <>
          </>
        )}
        {fleetList.length > 0 ? (
          <TableBody>
            {fleetList.map((x: any, count: number) => {
              const bgColor = fleetId === x.id ? SELECTED_COLOR : '#fff';

              return <ArrowedTableRow value={x.name} bgColor={bgColor} key={count}
                                      onClick={() => selectFleetItem(x)}/>;
            })}
          </TableBody>
        ) : (
          <>
          </>
        )}
      </Table>
    </TableContainer>
  );
}

export default FleetList;
