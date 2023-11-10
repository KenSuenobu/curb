import {getFleetCars} from '@/app/services/fleet';
import {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from '@mui/material';
import {TableHeader} from '@/app/components/common/TableHeader';
import {errorDialog} from '@/app/components/common/ConfirmDialog';
import {DeleteOutlined} from '@mui/icons-material';

export interface IFleetCarList {
  fleetId: number;
  onClick: (carTrimId: number) => any;
}

const SELECTED_COLOR = '#ccf';
const HEADER_NAME = 'Fleet Cars';

const FleetCarList = (props: IFleetCarList) => {
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';
  const [fleetCarList, setFleetCarList] = useState<any[]>([]);
  const [fleetCarId, setFleetCarId] = useState<number>(0);
  const [inputShowing, setInputShowing] = useState<boolean>(false);

  const reloadFleetCars = () => {
    if (accessToken) {
      if (props.fleetId === 0) {
        setFleetCarList([]);
        return;
      }

      getFleetCars(accessToken, props.fleetId)
        .then((x) => {
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
  }, [props.fleetId, accessToken]);

  const toggleInput = () => setInputShowing(!inputShowing);

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

                         // setCarMakeId(0);
                         // setCarModelId(0);
                         // setCarYearId(0);
                         // setCarTrimId(0);
                         // setFleetCarId(0);
                         // setCarModelList([]);
                         // setCarYearList([]);
                         // setCarTrimList([]);
                         // setCarFleetData({});
                       }}/>
              {/*{inputShowing ? (*/}
              {/*  <TableBody>*/}
              {/*    <TableRow>*/}
              {/*      <TableCell colSpan={2}>*/}
              {/*        <Stack direction={'row'}>*/}
              {/*          <Item sx={{ width: '25%' }}>*/}
              {/*            <FormControl sx={{ width: '100%' }}>*/}
              {/*              <InputLabel id={'fuel-type-label'}>Car Make</InputLabel>*/}
              {/*              <Select labelId={'fuel-type-label'} label={'Car Make'} name={'carMake'}*/}
              {/*                      style={{ textAlign: 'left' }} fullWidth*/}
              {/*                      onChange={((e: any) => {*/}
              {/*                        setCarMakeId(e.target.value);*/}
              {/*                        setCarModelId(0);*/}
              {/*                        setCarYearId(0);*/}
              {/*                        setCarTrimId(0);*/}
              {/*                        setFleetCarId(0);*/}
              {/*                        LoadCarModels(e.target.value, (x) => setCarModelList(x as never[]));*/}
              {/*                        setCarYearList([]);*/}
              {/*                        setCarTrimList([]);*/}
              {/*                        setCarFleetData({});*/}
              {/*                      })}>*/}
              {/*                {carMakeList.map((x, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}*/}
              {/*              </Select>*/}
              {/*            </FormControl>*/}
              {/*          </Item>*/}
              {/*          <Item sx={{ width: '25%' }}>*/}
              {/*            <FormControl sx={{ width: '100%' }}>*/}
              {/*              <InputLabel id={'fuel-type-label'}>Car Model</InputLabel>*/}
              {/*              <Select labelId={'fuel-type-label'} label={'Car Model'} name={'carModel'}*/}
              {/*                      style={{ textAlign: 'left' }} fullWidth*/}
              {/*                      onChange={(e: any) => {*/}
              {/*                        setCarModelId(e.target.value);*/}
              {/*                        setCarYearId(0);*/}
              {/*                        setCarTrimId(0);*/}
              {/*                        setFleetCarId(0);*/}
              {/*                        LoadModelYears(e.target.value, (x) => setCarYearList(x as never[]));*/}
              {/*                        setCarTrimList([]);*/}
              {/*                        setCarFleetData({});*/}
              {/*                      }}>*/}
              {/*                {carModelList.map((x, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}*/}
              {/*              </Select>*/}
              {/*            </FormControl>*/}
              {/*          </Item>*/}
              {/*          <Item sx={{ width: '25%' }}>*/}
              {/*            <FormControl sx={{ width: '100%' }}>*/}
              {/*              <InputLabel id={'fuel-type-label'}>Car Year</InputLabel>*/}
              {/*              <Select labelId={'fuel-type-label'} label={'Car Year'} name={'carYear'}*/}
              {/*                      style={{ textAlign: 'left' }} fullWidth*/}
              {/*                      onChange={(e: any) => {*/}
              {/*                        setCarYearId(e.target.value);*/}
              {/*                        setCarTrimId(0);*/}
              {/*                        setFleetCarId(0);*/}
              {/*                        LoadCarTrims(e.target.value, (x) => setCarTrimList(x));*/}
              {/*                        setCarFleetData({});*/}
              {/*                      }}>*/}
              {/*                {carYearList.map((x, counter) => <MenuItem value={x.id} key={counter}>{x.year}</MenuItem>)}*/}
              {/*              </Select>*/}
              {/*            </FormControl>*/}
              {/*          </Item>*/}
              {/*          <Item sx={{ width: '25%' }}>*/}
              {/*            <FormControl sx={{ width: '100%' }}>*/}
              {/*              <InputLabel id={'fuel-type-label'}>Car Trim</InputLabel>*/}
              {/*              <Select labelId={'fuel-type-label'} label={'Car Trim'} name={'carTrim'}*/}
              {/*                      style={{ textAlign: 'left' }} fullWidth*/}
              {/*                      onChange={(e: any) => {*/}
              {/*                        setCarTrimId(e.target.value);*/}
              {/*                        setFleetCarId(0);*/}
              {/*                        setCarFleetData({});*/}
              {/*                      }}>*/}
              {/*                {carTrimList.map((x, counter) => <MenuItem value={x.id} key={counter}>{x.name}</MenuItem>)}*/}
              {/*              </Select>*/}
              {/*            </FormControl>*/}
              {/*          </Item>*/}
              {/*          <Item>*/}
              {/*            <Button variant={'contained'}*/}
              {/*                    disabled={carTrimId === 0}*/}
              {/*                    onClick={() => addFleetCar()}>ADD</Button>*/}
              {/*          </Item>*/}
              {/*        </Stack>*/}
              {/*      </TableCell>*/}
              {/*    </TableRow>*/}
              {/*  </TableBody>*/}
              {/*) : (*/}
              {/*  <>*/}
              {/*  </>*/}
              {/*)}*/}
          {fleetCarList.length > 0 ? (
            <TableBody>
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
            </TableBody>
          ) : (
            <>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default FleetCarList;
