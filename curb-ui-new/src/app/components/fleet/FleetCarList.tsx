import {addFleetCar, getFleetCars} from '@/app/services/fleet';
import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {
  Button,
  FormControl,
  IconButton, InputLabel, MenuItem, Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import {TableHeader} from '@/app/components/common/TableHeader';
import {alertDialog, errorDialog} from '@/app/components/common/ConfirmDialog';
import {DeleteOutlined} from '@mui/icons-material';
import Item from '@/app/components/common/Item';
import {getAllMakes, getAllModels, getAllTrims, getAllYears} from '@/app/services/car-definitions';
import {SELECTED_COLOR} from '@/app/components/common/ColorDatabase';

export interface IFleetCarList {
  fleetId: number;
  onClick: (carTrimId: number) => any;
}

const HEADER_NAME = 'Fleet Cars';

const FleetCarList = (props: IFleetCarList) => {
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';
  const [fleetCarList, setFleetCarList] = useState<any[]>([]);
  const [fleetCarId, setFleetCarId] = useState<number>(0);
  const [inputShowing, setInputShowing] = useState<boolean>(false);
  const [carMakeList, setCarMakeList] = useState<any[]>([]);
  const [carModelList, setCarModelList] = useState<any[]>([]);
  const [carYearList, setCarYearList] = useState<any[]>([]);
  const [carTrimList, setCarTrimList] = useState<any[]>([]);
  const [carMakeId, setCarMakeId] = useState<number>(0);
  const [carModelId, setCarModelId] = useState<number>(0);
  const [carYearId, setCarYearId] = useState<number>(0);
  const [carTrimId, setCarTrimId] = useState<number>(0);

  const reloadFleetCars = () => {
    if (accessToken) {
      if (props.fleetId === 0) {
        setFleetCarList([]);
        return;
      }

      getFleetCars(accessToken, props.fleetId)
        .then((x: any) => {
          setFleetCarList(x.cars);
        })
        .catch((x) => {
          console.log('Error', x);
          setFleetCarList([]);
        });
    }
  }

  useEffect(() => {
    reloadFleetCars();

    if (accessToken) {
      getAllMakes(accessToken)
        .then((x: any) => setCarMakeList(x.makes));
    }
  }, [props.fleetId, accessToken]);

  const toggleInput = () => {
    setInputShowing(!inputShowing);
  }

  const addFleetCarToFleet = () => {
    addFleetCar(accessToken, props.fleetId, carTrimId)
      .then((x) => {
        console.log('Added fleet car', x);
        reloadFleetCars();
      });
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 300, borderBottom: '1px solid #ccc', width: '100%' }}>
        <Table stickyHeader size={'small'}>
          <TableHeader header={HEADER_NAME}
                       onAdd={() => {
                         if (props.fleetId === 0) {
                           errorDialog('You must first select a fleet.');
                           return;
                         }

                         toggleInput();

                         setCarModelList([]);
                         setCarYearList([]);
                         setCarTrimList([]);
                         setCarModelId(0);
                         setCarYearId(0);
                         setCarTrimId(0);
                       }}/>
          <TableBody>
          {inputShowing ? (
            <TableRow>
              <TableCell colSpan={2}>
                <Stack direction={'row'}>
                  <Item sx={{ width: '25%', padding: '1px' }}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id={'fuel-type-label'}>Car Make</InputLabel>
                      <Select labelId={'fuel-type-label'} label={'Car Make'} name={'carMake'}
                              style={{ textAlign: 'left' }} fullWidth
                              onChange={((e: any) => {
                                setCarMakeId(e.target.value);
                                setCarModelList([]);
                                setCarYearList([]);
                                setCarTrimList([]);
                                setCarModelId(0);
                                setCarYearId(0);
                                setCarTrimId(0);

                                getAllModels(accessToken, e.target.value)
                                  .then((x: any) => setCarModelList(x.makes));
                              })}>
                        {carMakeList.map((x: any, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Item>
                  <Item sx={{ width: '25%', padding: '1px' }}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id={'fuel-type-label'}>Car Model</InputLabel>
                      <Select labelId={'fuel-type-label'} label={'Car Model'} name={'carModel'}
                              style={{ textAlign: 'left' }} fullWidth
                              onChange={(e: any) => {
                                setCarModelId(e.target.value);
                                setCarYearList([]);
                                setCarTrimList([]);
                                setCarYearId(0);
                                setCarTrimId(0);

                                getAllYears(accessToken, e.target.value)
                                  .then((x: any) => setCarYearList(x.makes));
                              }}>
                        {carModelList.map((x: any, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Item>
                  <Item sx={{ width: '25%', padding: '1px' }}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id={'fuel-type-label'}>Car Year</InputLabel>
                      <Select labelId={'fuel-type-label'} label={'Car Year'} name={'carYear'}
                              style={{ textAlign: 'left' }} fullWidth
                              onChange={(e: any) => {
                                setCarYearId(e.target.value);
                                setCarTrimList([]);
                                setCarTrimId(0);

                                getAllTrims(accessToken, e.target.value)
                                  .then((x: any) => setCarTrimList(x.makes));
                              }}>
                        {carYearList.map((x: any, counter) => <MenuItem value={x.id} key={counter}>{x.year}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Item>
                  <Item sx={{ width: '25%', padding: '1px' }}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id={'fuel-type-label'}>Car Trim</InputLabel>
                      <Select labelId={'fuel-type-label'} label={'Car Trim'} name={'carTrim'}
                              style={{ textAlign: 'left' }} fullWidth
                              onChange={(e: any) => {
                                setCarTrimId(e.target.value);
                              }}>
                        {carTrimList.map((x: any, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Item>
                  <Item sx={{ padding: '2px' }}>
                    <Button variant={'contained'}
                            disabled={carTrimId === 0}
                            onClick={() => addFleetCarToFleet()}>ADD</Button>
                  </Item>
                </Stack>
              </TableCell>
            </TableRow>
          ) : (<></>)}

          {fleetCarList.length > 0 && (
            <>
              {fleetCarList.map((x: any) => {
                const bgColor = fleetCarId === x.id ? SELECTED_COLOR : '#fff';

                return (
                  <>
                    <TableRow hover sx={{ cursor: 'pointer' }}>
                      <TableCell
                        sx={{ backgroundColor: bgColor, width: '90%' }}
                        onClick={() => {
                          setFleetCarId(x.id);
                          setInputShowing(false);
                          props.onClick(x.id);
                        }}>
                        <Typography>
                          {x.carYear} {x.makeName} {x.modelName} {x.trimName}: &quot;{x.data.listingNickname ?? 'Unnamed'}&quot;
                        </Typography>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          setFleetCarId(x.id);
                          setInputShowing(false);
                          props.onClick(x.id);
                        }}
                        sx={{ textAlign: 'right', backgroundColor: bgColor, width: '10%', paddingRight: '5px' }}>
                        <IconButton style={{ padding: '2px' }}>
                          <DeleteOutlined/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              )}
            </>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default FleetCarList;
