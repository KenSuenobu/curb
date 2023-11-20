'use client';

import Image from 'next/image'
import LogoutButton from '@/app/components/login/LogoutButton';
import {getAllMakes} from '@/app/services/car-definitions';
import MakesForm from '@/app/components/cars/MakesForm';
import React, {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {loadDashboard} from '@/app/services/dashboard';
import {IconButton, LinearProgress, Link, Paper, Stack, Typography} from '@mui/material';
import {LocationSearchingOutlined, RefreshOutlined} from '@mui/icons-material';
import moment from 'moment/moment';
import Item from '@/app/components/common/Item';

const Home = () => {
  const [dashboardData, setDashboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const reloadDashboard = () => {
    if (accessToken) {
      setLoading(true);
      loadDashboard(accessToken)
        .then((x) => console.log(x))
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    reloadDashboard();
  }, [accessToken]);

  return (
    <main>
      <div style={{ width: '100%' }}>
        <Stack direction={'row'}>
          <Item sx={{ width: '50%', textAlign: 'left' }}>
            <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Dashboard</u></Typography>
          </Item>

          <Item sx={{ width: '50%', textAlign: 'right' }}>
            <IconButton onClick={() => reloadDashboard()} disabled={loading}>
              <RefreshOutlined/>
            </IconButton>
          </Item>
        </Stack>
      </div>

      {loading && (
        <LinearProgress/>
      )}

      {/*{dashboardRows.length > 0 && dashboardRows.map((x) => {*/}
      {/*  return (*/}
      {/*    <>*/}
      {/*      <Stack direction={'row'} style={{ padding: '5px', paddingBottom: '15px' }}>*/}
      {/*        {x.map((y) => {*/}
      {/*          const cardTotalsChart = {*/}
      {/*            grid: { top: 60, right: 40, bottom: 20, left: 40 },*/}
      {/*            xAxis: {*/}
      {/*              type: 'category',*/}
      {/*              data: ["January", "February", "March", "April", "May", "June", "July", "August", "September",*/}
      {/*                "October", "November", "December"],*/}
      {/*            },*/}
      {/*            title: {*/}
      {/*              text: 'Total Net',*/}
      {/*            },*/}
      {/*            legend: {*/}
      {/*              text: 'Month',*/}
      {/*            },*/}
      {/*            yAxis: {*/}
      {/*              type: 'value',*/}
      {/*            },*/}
      {/*            series: [*/}
      {/*              {*/}
      {/*                data: [*/}
      {/*                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,*/}
      {/*                ],*/}
      {/*                type: 'bar',*/}
      {/*                smooth: true,*/}
      {/*                areaStyle: {*/}
      {/*                  opacity: 0.8,*/}
      {/*                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [*/}
      {/*                    {*/}
      {/*                      offset: 0,*/}
      {/*                      color: 'rgb(0, 142, 255)'*/}
      {/*                    },*/}
      {/*                    {*/}
      {/*                      offset: 1,*/}
      {/*                      color: 'rgb(0, 40, 92)'*/}
      {/*                    }*/}
      {/*                  ]),*/}
      {/*                },*/}
      {/*                showBackground: true,*/}
      {/*                backgroundStyle: {*/}
      {/*                  color: 'rgba(180, 180, 180, 0.2)'*/}
      {/*                }*/}
      {/*              },*/}
      {/*            ],*/}
      {/*            tooltip: {*/}
      {/*              trigger: 'axis',*/}
      {/*            },*/}
      {/*          };*/}

      {/*          const cardTripsChart = {*/}
      {/*            grid: { top: 60, right: 40, bottom: 20, left: 40 },*/}
      {/*            xAxis: {*/}
      {/*              type: 'category',*/}
      {/*              data: ["January", "February", "March", "April", "May", "June", "July", "August", "September",*/}
      {/*                "October", "November", "December"],*/}
      {/*            },*/}
      {/*            title: {*/}
      {/*              text: 'Total Trips',*/}
      {/*            },*/}
      {/*            legend: {*/}
      {/*              text: 'Month',*/}
      {/*            },*/}
      {/*            yAxis: {*/}
      {/*              type: 'value',*/}
      {/*            },*/}
      {/*            series: [*/}
      {/*              {*/}
      {/*                data: [*/}
      {/*                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,*/}
      {/*                ],*/}
      {/*                type: 'bar',*/}
      {/*                smooth: true,*/}
      {/*                areaStyle: {*/}
      {/*                  opacity: 0.8,*/}
      {/*                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [*/}
      {/*                    {*/}
      {/*                      offset: 0,*/}
      {/*                      color: 'rgb(0, 142, 255)'*/}
      {/*                    },*/}
      {/*                    {*/}
      {/*                      offset: 1,*/}
      {/*                      color: 'rgb(0, 40, 92)'*/}
      {/*                    }*/}
      {/*                  ]),*/}
      {/*                },*/}
      {/*                showBackground: true,*/}
      {/*                backgroundStyle: {*/}
      {/*                  color: 'rgba(180, 180, 180, 0.2)'*/}
      {/*                }*/}
      {/*              },*/}
      {/*            ],*/}
      {/*            tooltip: {*/}
      {/*              trigger: 'axis',*/}
      {/*            },*/}
      {/*          };*/}

      {/*          for(const earning of y.tripCarEarnings) {*/}
      {/*            const monthPosition = parseInt(earning.month);*/}
      {/*            const total = earning.earnings_total.toFixed(2);*/}

      {/*            cardTotalsChart.series[0].data[monthPosition - 1] = total;*/}
      {/*          }*/}

      {/*          for(const trip of y.tripCarTrips) {*/}
      {/*            const monthPosition = parseInt(trip.month);*/}
      {/*            const total = trip.total_trips;*/}

      {/*            cardTripsChart.series[0].data[monthPosition - 1] = total;*/}
      {/*          }*/}

      {/*          return (*/}
      {/*            <>*/}
      {/*              /!* Card *!/*/}
      {/*              <Paper sx={{ width: '50%',*/}
      {/*                textAlign: 'left',*/}
      {/*                border: '1px solid #ccc',*/}
      {/*                padding: '4px',*/}
      {/*                paddingLeft: '6px' }}>*/}
      {/*                <Stack direction={'row'}>*/}
      {/*                  <Item sx={{ width: '80%', textAlign: 'left', padding: '0px' }}>*/}
      {/*                    <Typography variant={'h4'} fontWeight={'bold'} color={'black'}>*/}
      {/*                      {y.makeName}*/}
      {/*                    </Typography>*/}

      {/*                    <Typography color={'black'}>*/}
      {/*                      <Link onClick={() => window.open(y.listingUrl, '_blank')}>*/}
      {/*                        {y.carYear} {y.modelName} {y.trimName} "{y.data.listingNickname}"<br/>*/}
      {/*                      </Link>*/}
      {/*                      {y.milesTotal ?? 0} total miles @ $0.655: $ {parseFloat(y.milesTotal * 0.655).toFixed(2)}*/}
      {/*                    </Typography>*/}
      {/*                  </Item>*/}

      {/*                  <Item sx={{ width: '20%', textAlign: 'right' }}>*/}
      {/*                    {y.trackingUrl && (*/}
      {/*                      <IconButton onClick={() => openTracker(y.trackingUrl)}>*/}
      {/*                        <LocationSearchingOutlined/>*/}
      {/*                      </IconButton>*/}
      {/*                    )}*/}
      {/*                  </Item>*/}
      {/*                </Stack>*/}
      {/*                <p/>*/}
      {/*                <Stack direction={'row'}>*/}
      {/*                  <Item sx={{ width: '50%', textAlign: 'left', padding: '0px' }}>*/}
      {/*                    <Typography color={'black'}>*/}
      {/*                      Gross: $ {parseFloat(y.grossTotal ?? '0.00').toFixed(2)}<br/>*/}
      {/*                      Loans: $ {parseFloat(y.loanTotal ?? '0.00').toFixed(2)} {y.carLoan.paymentDueDate && (*/}
      {/*                      <>*/}
      {/*                        <Link href={y.carLoan.paymentUrl} target={'_blank'}>*/}
      {/*                          (Due: {y.carLoan.paymentDueDate.replaceAll(/[^0-9]/g, '')})*/}
      {/*                        </Link>*/}
      {/*                      </>*/}
      {/*                    )}*/}
      {/*                    </Typography>*/}
      {/*                  </Item>*/}

      {/*                  <Item sx={{ width: '50%', textAlign: 'right', padding: '0px' }}>*/}
      {/*                    <Typography color={'black'}>*/}
      {/*                      Profit: $ {(parseFloat(y.grossTotal ?? '0.00').toFixed(2) - parseFloat(y.loanTotal ?? '0.00').toFixed(2)).toFixed(2)}<br/>*/}
      {/*                    </Typography>*/}
      {/*                  </Item>*/}
      {/*                </Stack>*/}

      {/*                <p/>*/}

      {/*                <Stack direction={'row'}>*/}
      {/*                  <Item sx={{ width: '75%', textAlign: 'left', padding: '0px' }}>*/}
      {/*                    <Typography color={'black'}>*/}
      {/*                      {!y.currentTrip && y.nextTrip && (*/}
      {/*                        <>*/}
      {/*                          Next: {moment(y.nextTrip).format('ddd, MMM D YYYY; LT')}*/}
      {/*                          <br/>*/}
      {/*                        </>*/}
      {/*                      )}*/}
      {/*                      {!y.nextTrip && !y.currentTrip && (*/}
      {/*                        <>*/}
      {/*                          No upcoming trips.*/}
      {/*                        </>*/}
      {/*                      )}*/}
      {/*                      {y.currentTrip && (*/}
      {/*                        <>*/}
      {/*                          Current: <Link href={y.currentTrip.tripUrl} target={'_blank'}>*/}
      {/*                          {y.currentTripGuest.firstName} {y.currentTripGuest.lastName}*/}
      {/*                          , ends {moment(y.currentTrip.endTime).format('MM/DD/YYYY; LT')}*/}
      {/*                        </Link>*/}
      {/*                        </>*/}
      {/*                      )}*/}
      {/*                    </Typography>*/}
      {/*                  </Item>*/}

      {/*                  <Item sx={{ width: '25%', textAlign: 'right', padding: '0px' }}>*/}
      {/*                    <Typography color={'black'}>*/}
      {/*                      Total Trips: {y.tripsCount}*/}
      {/*                    </Typography>*/}
      {/*                  </Item>*/}
      {/*                </Stack>*/}

      {/*                <Stack direction={'row'}>*/}
      {/*                  <Item sx={{ width: '50%' }}>*/}
      {/*                    <Paper sx={{ width: '100%', padding: '1em' }}>*/}
      {/*                      <ReactEcharts*/}
      {/*                        option={cardTotalsChart}*/}
      {/*                        style={{ width: '100%', height: '200px' }}*/}
      {/*                      />*/}
      {/*                    </Paper>*/}
      {/*                  </Item>*/}

      {/*                  <Item sx={{ width: '50%' }}>*/}
      {/*                    <Paper sx={{ width: '100%', padding: '1em' }}>*/}
      {/*                      <ReactEcharts*/}
      {/*                        option={cardTripsChart}*/}
      {/*                        style={{ width: '100%', height: '200px' }}*/}
      {/*                      />*/}
      {/*                    </Paper>*/}
      {/*                  </Item>*/}
      {/*                </Stack>*/}
      {/*              </Paper>*/}

      {/*              /!* Padding *!/*/}
      {/*              <Item sx={{ width: '1%' }}></Item>*/}
      {/*            </>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </Stack>*/}
      {/*    </>*/}
      {/*  );*/}
      {/*})}*/}

      {/*{dashboardData.length > 0 && (*/}
      {/*  <Stack direction={'row'}>*/}
      {/*    <Item sx={{ width: '33%' }}>*/}
      {/*      <Paper sx={{ width: '100%', padding: '1em' }}>*/}
      {/*        <ReactEcharts*/}
      {/*          option={totalsChart}*/}
      {/*          style={{ width: '100%', height: '240px' }}*/}
      {/*        />*/}
      {/*      </Paper>*/}
      {/*    </Item>*/}

      {/*    <Item sx={{ width: '34%' }}>*/}
      {/*      <Paper sx={{ width: '100%', padding: '1em' }}>*/}
      {/*        <ReactEcharts*/}
      {/*          option={tripsChart}*/}
      {/*          style={{ width: '100%', height: '240px' }}*/}
      {/*        />*/}
      {/*      </Paper>*/}
      {/*    </Item>*/}

      {/*    <Item sx={{ width: '33%' }}>*/}
      {/*      <Paper sx={{ width: '100%' }}>*/}
      {/*        <Stack direction={'row'}>*/}
      {/*          <Item sx={{ width: '50%', color: 'black', textAlign: 'right', borderBottom: '1px solid #eee' }}>*/}
      {/*            <Typography variant={'h5'} fontWeight={'bold'}>*/}
      {/*              Total Gross:*/}
      {/*            </Typography>*/}
      {/*          </Item>*/}
      {/*          <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em', borderBottom: '1px solid #eee' }}>*/}
      {/*            <Typography variant={'h5'}>*/}
      {/*              $ {totalGross}*/}
      {/*            </Typography>*/}
      {/*          </Item>*/}
      {/*        </Stack>*/}

      {/*        <Stack direction={'row'}>*/}
      {/*          <Item sx={{ width: '50%', color: 'black', textAlign: 'right', borderBottom: '1px solid #eee' }}>*/}
      {/*            <Typography variant={'h5'} fontWeight={'bold'}>*/}
      {/*              Total Profit:*/}
      {/*            </Typography>*/}
      {/*          </Item>*/}
      {/*          <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em', borderBottom: '1px solid #eee' }}>*/}
      {/*            <Typography variant={'h5'}>*/}
      {/*              $ {totalProfit}*/}
      {/*            </Typography>*/}
      {/*          </Item>*/}
      {/*        </Stack>*/}

      {/*        <Stack direction={'row'}>*/}
      {/*          <Item sx={{ width: '50%', color: 'black', textAlign: 'right', borderBottom: '1px solid #eee' }}>*/}
      {/*            <Typography variant={'h5'} fontWeight={'bold'}>*/}
      {/*              Total Loss:*/}
      {/*            </Typography>*/}
      {/*          </Item>*/}
      {/*          <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em', borderBottom: '1px solid #eee' }}>*/}
      {/*            <Typography variant={'h5'}>*/}
      {/*              $ {(parseFloat(totalGross) - parseFloat(totalProfit)).toFixed(2)}*/}
      {/*            </Typography>*/}
      {/*          </Item>*/}
      {/*        </Stack>*/}

      {/*        <Stack direction={'row'}>*/}
      {/*          <Item sx={{ width: '50%', color: 'black', textAlign: 'right' }}>*/}
      {/*            <Typography variant={'h5'} fontWeight={'bold'}>*/}
      {/*              Total Trips:*/}
      {/*            </Typography>*/}
      {/*          </Item>*/}
      {/*          <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em' }}>*/}
      {/*            <Typography variant={'h5'}>*/}
      {/*              {totalTrips}*/}
      {/*            </Typography>*/}
      {/*          </Item>*/}
      {/*        </Stack>*/}
      {/*      </Paper>*/}
      {/*    </Item>*/}
      {/*  </Stack>*/}
      {/*)}*/}
    </main>
  );
}

export default Home;
