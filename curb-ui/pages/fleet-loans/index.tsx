import {
  Button, FormControl, IconButton, InputLabel, MenuItem,
  Paper, Select, Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {TableHeader} from '../../components/car-definitions/TableHeader';
import {ArrowRightOutlined, DeleteOutlined} from '@mui/icons-material';
import {errorDialog} from '../../components/dialogs/ConfirmDialog';
import Item from '../../components/common/Item';
import {LoadCarModels} from '../../components/database/car-model';
import {LoadModelYears} from '../../components/database/car-year';
import {LoadCarTrims} from '../../components/database/car-trim';
import React, {useEffect, useState} from 'react';
import {IFleet, LoadFleet} from '../../components/database/fleet';
import {IFleetCar, LoadFleetCars} from '../../components/database/fleet-car';

const SELECTED_COLOR = '#ccf';

const FleetLoans = () => {
  const [fleetList, setFleetList] = useState<IFleet[]>([]);
  const [fleetCarList, setFleetCarList] = useState<IFleetCar[]>([]);
  const [fleetId, setFleetId] = useState(0);
  const [fleetCarId, setFleetCarId] = useState(0);

  const reloadFleet = () => {
    LoadFleet((x: IFleet[]) => setFleetList(x));
  }

  const reloadFleetCars = (fId: number) => {
    LoadFleetCars(fId, (x: IFleetCar[]) => setFleetCarList(x));
  }

  useEffect(() => reloadFleet(), []);

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
                                reloadFleetCars(x.id);
                              }}><Typography>{x.name}</Typography></TableCell>
                            <TableCell
                              onClick={() => {
                                setFleetId(x.id);
                                reloadFleetCars(x.id);
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
                <TableHeader header={'Fleet Car'}/>
                {fleetCarList.length > 0 ? (
                  <TableBody>
                    {fleetCarList.map((x) => {
                      const bgColor = fleetCarId === x.id ? SELECTED_COLOR : '#fff';

                      return (
                        <>
                          <TableRow hover sx={{ cursor: 'pointer' }}>
                            <TableCell
                              colSpan={2}
                              sx={{ backgroundColor: bgColor, width: '90%' }}
                              onClick={() => setFleetCarId(x.id)}>
                              <Typography>
                                {x.carYear} {x.makeName} {x.modelName} {x.trimName}: "{x.data.listingNickname ?? 'Unnamed'}"
                              </Typography>
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

export default FleetLoans;
