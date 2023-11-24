'use client';

import Image from 'next/image'
import LogoutButton from '@/app/components/login/LogoutButton';
import {getAllMakes} from '@/app/services/car-definitions';
import MakesForm from '@/app/components/cars/MakesForm';
import React, {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {loadDashboard} from '@/app/services/dashboard';
import {IconButton, LinearProgress, Link, Paper, Stack, Typography} from '@mui/material';
import {FlightOutlined, LocationSearchingOutlined, RefreshOutlined} from '@mui/icons-material';
import moment from 'moment/moment';
import Item from '@/app/components/common/Item';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

const Home = () => {
  const [dashboardData, setDashboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalProfit, setTotalProfit] = useState<string>('0.00');
  const [totalTrips, setTotalTrips] = useState<number>(0);
  const [totalGross, setTotalGross] = useState<string>('0.00');
  const [totalMiles, setTotalMiles] = useState<number>(0);
  const {data: session} = useSession();
  const accessToken = session ? (session as any)['user']['accessToken'] : '';

  const totalsChart: any = {
    grid: { top: 60, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: 'category',
      data: ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"],
    },
    title: {
      text: 'Total Revenue per Month',
    },
    legend: {
      text: 'Month',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        type: 'bar',
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 142, 255)'
            },
            {
              offset: 1,
              color: 'rgb(0, 40, 92)'
            }
          ]),
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const tripsChart: any = {
    grid: { top: 60, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: 'category',
      data: ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"],
    },
    title: {
      text: 'Total Trips per Month',
    },
    legend: {
      text: 'Month',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        type: 'bar',
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 142, 255)'
            },
            {
              offset: 1,
              color: 'rgb(0, 40, 92)'
            }
          ]),
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const reloadDashboard = () => {
    if (accessToken) {
      setLoading(true);
      loadDashboard(accessToken)
        .then((x: any) => {
          let addableArray: any[] = [];
          const dataMap: any[] = [];

          for(const entry of x.dashboard) {
            addableArray.push(entry);

            if (addableArray.length >= 2) {
              dataMap.push(addableArray);
              addableArray = [];
            }
          }

          if (addableArray.length > 0) {
            dataMap.push(addableArray);
          }

          setDashboardData(dataMap);

          let total = 0.00;
          let trips: number = 0;
          let gross = 0.00;
          let miles: number = 0;

          for(const trip of x.dashboard) {
            total += trip.grossTotal - trip.loanTotal;
            trips += parseInt(trip.tripsCount);
            gross += trip.grossTotal;
            miles += parseInt(trip.milesTotal);
          }

          setTotalProfit(total.toFixed(2));
          setTotalTrips(trips);
          setTotalGross(gross.toFixed(2));
          setTotalMiles(miles);

          console.log(x.dashboard);
        })
        .finally(() => setLoading(false));
    }
  }

  const openTracker = (url: string) => {
    window.open(url, '_blank');
  }

  const openFlightAware = (trip: any) => {
    const iana = trip.airlineIana;
    const flightNumber = trip.flightNumber;

    window.open(`https://flightaware.com/live/flight/${iana}${flightNumber}`, '_blank');
  }

  useEffect(() => {
    reloadDashboard();
  }, [accessToken]);

  if (!dashboardData) {
    return (
      <>
        <LinearProgress/>
      </>
    )
  }

  return (
    <main>
      <div style={{ width: '100%' }}>
        <Stack direction={'row'}>
          <Item sx={{ width: '100%', textAlign: 'right' }}>
            <IconButton onClick={() => reloadDashboard()} disabled={loading}>
              <RefreshOutlined/>
            </IconButton>
          </Item>
        </Stack>
      </div>

      {loading && (
        <LinearProgress/>
      )}

      {dashboardData.length > 0 && (dashboardData.map((x: any) => {
        return (
          <>
            <Stack direction={'row'} style={{ padding: '5px', paddingBottom: '15px' }}>
              {x.map((y: any) => {
                const cardTotalsChart: any = {
                  grid: { top: 60, right: 40, bottom: 20, left: 40 },
                  xAxis: {
                    type: 'category',
                    data: ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                      "October", "November", "December"],
                  },
                  title: {
                    text: 'Total Net',
                  },
                  legend: {
                    text: 'Month',
                  },
                  yAxis: {
                    type: 'value',
                  },
                  series: [
                    {
                      data: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      ],
                      type: 'bar',
                      smooth: true,
                      areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: 'rgb(0, 142, 255)'
                          },
                          {
                            offset: 1,
                            color: 'rgb(0, 40, 92)'
                          }
                        ]),
                      },
                      showBackground: true,
                      backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                      }
                    },
                  ],
                  tooltip: {
                    trigger: 'axis',
                  },
                };

                const cardTripsChart: any = {
                  grid: { top: 60, right: 40, bottom: 20, left: 40 },
                  xAxis: {
                    type: 'category',
                    data: ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                      "October", "November", "December"],
                  },
                  title: {
                    text: 'Total Trips',
                  },
                  legend: {
                    text: 'Month',
                  },
                  yAxis: {
                    type: 'value',
                  },
                  series: [
                    {
                      data: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      ],
                      type: 'bar',
                      smooth: true,
                      areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: 'rgb(0, 142, 255)'
                          },
                          {
                            offset: 1,
                            color: 'rgb(0, 40, 92)'
                          }
                        ]),
                      },
                      showBackground: true,
                      backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                      }
                    },
                  ],
                  tooltip: {
                    trigger: 'axis',
                  },
                };

                for(const earning of y.tripCarEarnings) {
                  const monthPosition = parseInt(earning.month);
                  const total = earning.earnings_total.toFixed(2);

                  cardTotalsChart.series[0].data[monthPosition - 1] = total;
                }

                for(const trip of y.tripCarTrips) {
                  const monthPosition = parseInt(trip.month);
                  const total = trip.total_trips;

                  cardTripsChart.series[0].data[monthPosition - 1] = total;
                }

                const grossTotal = y.grossTotal ? parseFloat(y.grossTotal) : 0.00;
                const loanTotal = y.loanTotal ? parseFloat(y.loanTotal) : 0.00;

                return (
                  <>
                    {/* Card */}
                    <Paper sx={{ width: '50%',
                      textAlign: 'left',
                      border: '1px solid #ccc',
                      padding: '4px',
                      paddingLeft: '6px' }}>
                      <Stack direction={'row'}>
                        <Item sx={{ width: '80%', textAlign: 'left', padding: '0px' }}>
                          <Typography variant={'h4'} fontWeight={'bold'} color={'black'}>
                            {y.makeName}
                          </Typography>

                          <Typography color={'black'}>
                            <Link onClick={() => window.open(y.listingUrl, '_blank')}>
                              {y.carYear} {y.modelName} {y.trimName} &quot;{y.data.listingNickname}&quot;<br/>
                            </Link>
                            {y.milesTotal ?? 0} total miles @ $0.655: $ {(parseFloat(y.milesTotal) * 0.655).toFixed(2)}
                          </Typography>
                        </Item>

                        <Item sx={{ width: '20%', textAlign: 'right' }}>
                          {y.trackingUrl && (
                            <IconButton onClick={() => openTracker(y.trackingUrl)}>
                              <LocationSearchingOutlined/>
                            </IconButton>
                          )}
                          {y.currentTrip?.airlineIana && (
                            <IconButton onClick={() => openFlightAware(y.currentTrip)}>
                              <FlightOutlined/>
                            </IconButton>
                          )}
                        </Item>
                      </Stack>
                      <p/>
                      <Stack direction={'row'}>
                        <Item sx={{ width: '50%', textAlign: 'left', padding: '0px' }}>
                          <Typography color={'black'}>
                            Gross: $ {grossTotal.toFixed(2)}<br/>
                            {/*Loans: $ {parseFloat(y.loanTotal ?? '0.00').toFixed(2)} {y.carLoan.paymentDueDate && (*/}
                          {/*  <>*/}
                          {/*    <Link href={y.carLoan.paymentUrl} target={'_blank'}>*/}
                          {/*      (Due: {y.carLoan.paymentDueDate.replaceAll(/[^0-9]/g, '')})*/}
                          {/*    </Link>*/}
                          {/*  </>*/}
                          {/*)}*/}
                          </Typography>
                        </Item>

                        <Item sx={{ width: '50%', textAlign: 'right', padding: '0px' }}>
                          <Typography color={'black'}>
                            Profit: $ {(grossTotal - loanTotal).toFixed(2)}<br/>
                          </Typography>
                        </Item>
                      </Stack>

                      <p/>

                      <Stack direction={'row'}>
                        <Item sx={{ width: '75%', textAlign: 'left', padding: '0px' }}>
                          <Typography color={'black'}>
                            {!y.currentTrip && y.nextTrip && (
                              <>
                                Next: {moment(y.nextTrip).format('ddd, MMM D YYYY; LT')}
                                <br/>
                              </>
                            )}
                            {!y.nextTrip && !y.currentTrip && (
                              <>
                                No upcoming trips.
                              </>
                            )}
                            {y.currentTrip && (
                              <>
                                Current: <Link href={y.currentTrip.tripUrl} target={'_blank'}>
                                {y.currentTripGuest.firstName} {y.currentTripGuest.lastName}
                                , ends {moment(y.currentTrip.endTime).format('MM/DD/YYYY; LT')}
                              </Link>
                              </>
                            )}
                          </Typography>
                        </Item>

                        <Item sx={{ width: '25%', textAlign: 'right', padding: '0px' }}>
                          <Typography color={'black'}>
                            Total Trips: {y.tripsCount}
                          </Typography>
                        </Item>
                      </Stack>

                      <Stack direction={'row'}>
                        <Item sx={{ width: '50%' }}>
                          <Paper sx={{ width: '100%', padding: '1em' }}>
                            <ReactEcharts
                              option={cardTotalsChart}
                              style={{ width: '100%', height: '200px' }}
                            />
                          </Paper>
                        </Item>

                        <Item sx={{ width: '50%' }}>
                          <Paper sx={{ width: '100%', padding: '1em' }}>
                            <ReactEcharts
                              option={cardTripsChart}
                              style={{ width: '100%', height: '200px' }}
                            />
                          </Paper>
                        </Item>
                      </Stack>
                    </Paper>

                    {/* Padding */}
                    <Item sx={{ width: '1%' }}></Item>
                  </>
                );
              })}
            </Stack>
          </>
        );
      }))}

      {dashboardData.length > 0 && (
        <Stack direction={'row'}>
          <Item sx={{ width: '33%' }}>
            <Paper sx={{ width: '100%', padding: '1em' }}>
              <ReactEcharts
                option={totalsChart}
                style={{ width: '100%', height: '240px' }}
              />
            </Paper>
          </Item>

          <Item sx={{ width: '34%' }}>
            <Paper sx={{ width: '100%', padding: '1em' }}>
              <ReactEcharts
                option={tripsChart}
                style={{ width: '100%', height: '240px' }}
              />
            </Paper>
          </Item>

          <Item sx={{ width: '33%' }}>
            <Paper sx={{ width: '100%' }}>
              <Stack direction={'row'}>
                <Item sx={{ width: '50%', color: 'white', backgroundColor: 'black', textAlign: 'right', borderBottom: '1px solid #eee' }}>
                  <Typography fontWeight={'bold'}>
                    Totals
                  </Typography>
                </Item>
                <Item sx={{ width: '50%', color: 'white', backgroundColor: 'black', textAlign: 'right', borderLeft: '1px solid #fff', borderBottom: '1px solid #eee' }}>
                  <Typography fontWeight={'bold'}>
                    Amounts
                  </Typography>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'right', borderBottom: '1px solid #eee' }}>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Gross:
                  </Typography>
                </Item>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                  <Typography variant={'h5'}>
                    $ {totalGross}
                  </Typography>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'right', borderBottom: '1px solid #eee' }}>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Profit:
                  </Typography>
                </Item>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                  <Typography variant={'h5'}>
                    $ {totalProfit}
                  </Typography>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'right', borderBottom: '1px solid #eee' }}>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Loss:
                  </Typography>
                </Item>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                  <Typography variant={'h5'}>
                    $ {(parseFloat(totalGross) - parseFloat(totalProfit)).toFixed(2)}
                  </Typography>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'right', borderBottom: '1px solid #eee' }}>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Miles:
                  </Typography>
                </Item>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                  <Typography variant={'h5'}>
                    {totalMiles}
                  </Typography>
                </Item>
              </Stack>

              <Stack direction={'row'}>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'right' }}>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    Trips:
                  </Typography>
                </Item>
                <Item sx={{ width: '50%', color: 'black', textAlign: 'left', paddingLeft: '1em', borderLeft: '1px solid #ccc' }}>
                  <Typography variant={'h5'}>
                    {totalTrips}
                  </Typography>
                </Item>
              </Stack>
            </Paper>
          </Item>
        </Stack>
      )}
    </main>
  );
}

export default Home;
