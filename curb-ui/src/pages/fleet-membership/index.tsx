import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button, IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {ArrowRightOutlined, DeleteOutlined} from '@mui/icons-material';
import { LoadFleet } from '@/components/database/fleet';
import { errorDialog } from '@/components/dialogs/ConfirmDialog';
import { TableHeader } from '@/components/car-definitions/TableHeader';

const SELECTED_COLOR = '#ccf';

export interface IFleetMembershipProps {
  jwt: string;
}

const FleetMembership = (props: IFleetMembershipProps) => {
  const [userInfo, setUserInfo] = useState(null);
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetId, setFleetId] = useState(0);
  const [fleetMemberList, setFleetMemberList] = useState([]);
  const [fleetMemberEmail, setFleetMemberEmail] = useState('');
  const [addFleetMemberShowing, setAddFleetMemberShowing] = useState(false);
  const fleetMemberRef = useRef('');

  const reloadFleet = (id: number) => {
    LoadFleet(id, (x: IFleet[]) => setFleetList(x));
  }

  const reloadFleetMembership = (id: number) => {
    axios.get(`/app/fleet/list/fleet/${id}/members`)
      .then((x) => {
        setFleetMemberList(x.data);
        console.log(`Membership Data: ${x.data.toString()}`);
      }).catch((x) => {
        errorDialog(`Unable to retrieve fleet membership list: ${x}`);
        return;
    });
  }

  const addFleetMember = () => {
    const fleetMember = fleetMemberRef.current.value;

    if (fleetMember.length == 0) {
      errorDialog('Missing e-mail address.');
      return;
    }

    axios.put(`/app/fleet/membership/${fleetId}/${fleetMember}`)
      .then((x) => {
        if (x.data === true) {
          reloadFleetMembership(fleetId);
          setAddFleetMemberShowing(false);
          fleetMemberRef.current.value = '';
        } else {
          errorDialog(`Could not add ${fleetMember} to the fleet: account may not exist, or may not yet have been verified.`);
          setAddFleetMemberShowing(false);
          fleetMemberRef.current.value = '';
          return;
        }
      })
      .catch((x) => {
        errorDialog('Unable to add the member to the fleet.');
        console.log(x);
      });
  }

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
        reloadFleet(x.data.id);
      }).catch((x) => {
        errorDialog('Unable to retrieve login data; please login again.');
        return;
      });
  }, [props.jwt]);

  if (!userInfo) {
    return (
      <>
        <LinearProgress fullWidth/>
      </>
    );
  }

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Fleet'}/>
                {fleetList.length > 0 ? (
                  <TableBody>
                    {fleetList.map((x) => {
                      const bgColor = fleetId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setFleetId(x.id);
                                setFleetMemberEmail('');
                                reloadFleetMembership(x.id);
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetId(x.id);
                                setFleetMemberEmail('');
                                reloadFleetMembership(x.id);
                              }}
                              sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', paddingRight: '5px' }}><ArrowRightOutlined/></TableCell>
                          </TableRow>
                        </>
                      )}
                    )}
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
              </Table>
            </TableContainer>
          </div>

          <div style={{ width: '75%', borderRight: '1px solid #ccc' }}>
            <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
              <Table stickyHeader size={'small'}>
                <TableHeader header={'Fleet Members'}
                             onAdd={() => {
                               setAddFleetMemberShowing(!addFleetMemberShowing);
                             }}/>
                {addFleetMemberShowing ? (
                  <>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <TextField variant={'standard'} required inputRef={fleetMemberRef}
                                     autoFocus fullWidth
                                     onKeyDown={(ev) => {
                                       if (ev.key === 'Escape') {
                                         setAddFleetMemberShowing(false);
                                         fleetMemberRef.current.value = '';
                                       } else if (ev.key === 'Enter') {
                                         addFleetMember();
                                       }
                                     }}/></TableCell>
                        <TableCell>
                          <Button variant={'contained'} onClick={() => addFleetMember()}>ADD</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                  </>
                )}
                {fleetMemberList.length > 0 ? (
                  <TableBody>
                    {fleetMemberList.map((x) => {
                      const bgColor = fleetMemberEmail === x ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => {
                                setFleetMemberEmail(x);
                              }}>
                              <Typography>
                                {x}
                              </Typography>
                            </TableCell>
                            <TableCell
                              onClick={() => {
                              }}
                              sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', paddingRight: '5px' }}>
                              <IconButton>
                                <DeleteOutlined/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    )}
                  </TableBody>
                ) : (
                  <>
                  </>
                )}
              </Table>
            </TableContainer>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default FleetMembership;
