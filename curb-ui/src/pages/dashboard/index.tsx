import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {errorDialog} from '@/components/dialogs/ConfirmDialog';
import {Paper, Stack, TextField, Typography} from '@mui/material';
import Item from '@/components/common/Item';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

export interface IDashboardProperties {
  jwt: string;
}

const Dashboard = (props: IDashboardProperties) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any[]>([]);

  const reloadDashboard = () => {
    axios.get(`/app/dashboard/list/${props.jwt}`)
      .then((x) => setDashboardData(x.data))
      .catch((x) => {
        errorDialog('Unable to load dashboard');
        setDashboardData([]);
      });
  }

  useEffect(() => {
    axios.get(`/app/user/login/${props.jwt}`)
      .then((x) => {
        setUserInfo(x.data);
        reloadDashboard();
      }).catch((x) => {
      errorDialog(`Unable to retrieve login data; please login again: ${x}`);
      return;
    });
  }, [props.jwt]);

  const rows = Math.round(dashboardData.length / 2);
  const dashboardRows: any[] = [];

  for (let i = 0; i < rows + 1; i++) {
    dashboardRows.push([]);
    for (let col = 0; col < 2; col++) {
      if (dashboardData[(i * 2) + col]) {
        dashboardRows[i].push(dashboardData[(i * 2) + col]);
      }
    }
  }

  const totalsChart = {
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

  const tripsChart = {
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

  if (dashboardData.length > 0) {
    const earnings = dashboardData[0].earnings;
    const trips = dashboardData[0].trips;

    for(const earning of earnings) {
      const monthPosition = parseInt(earning.month);
      const total = earning.earnings_total.toFixed(2);

      totalsChart.series[0].data[monthPosition - 1] = total;
    }

    for(const trip of trips) {
      const monthPosition = parseInt(trip.month);
      const total = parseInt(trip.total_trips);

      tripsChart.series[0].data[monthPosition - 1] = total;
    }
  }

  return (
    <>
      <div style={{ width: '100%', paddingLeft: '0.5em', paddingTop: '1.5em' }}>
        <Typography sx={{ fontWeight: 'bold', color: '#000' }}><u>Dashboard</u></Typography>
      </div>

      {dashboardRows.map((x) => {
        return (
          <>
            <Stack direction={'row'} style={{ padding: '5px', paddingBottom: '15px' }}>
              {x.map((y) => (
                <>
                  {/* Card */}
                  <Paper sx={{ width: '50%',
                    textAlign: 'left',
                    border: '1px solid #ccc',
                    padding: '4px',
                    paddingLeft: '6px' }}>
                    <Typography variant={'h4'} fontWeight={'bold'}>
                      {y.makeName}
                    </Typography>
                    <Typography>
                      {y.carYear} {y.modelName} {y.trimName} "{y.data.listingNickname}"<br/>
                      {y.milesTotal} total miles
                    </Typography>
                    <p/>
                    <Stack direction={'row'}>
                      <Item sx={{ width: '50%', textAlign: 'left', padding: '0px' }}>
                        <Typography color={'black'}>
                          Gross: $ {parseFloat(y.grossTotal ?? '0.00').toFixed(2)}<br/>
                          Loans: $ {parseFloat(y.loanTotal ?? '0.00').toFixed(2)}
                        </Typography>
                      </Item>

                      <Item sx={{ width: '50%', textAlign: 'right', padding: '0px' }}>
                        <Typography color={'black'}>
                          Profit: $ {(parseFloat(y.grossTotal ?? '0.00').toFixed(2) - parseFloat(y.loanTotal ?? '0.00').toFixed(2)).toFixed(2)}
                        </Typography>
                      </Item>
                    </Stack>

                    {y.nextTrip && (
                      <>
                        <p/>
                        Next Trip: {moment(y.nextTrip).format('ddd, MMM D YYYY; LT')}<br/>
                      </>
                    )}
                    Total Trips: {y.tripsCount}<br/>
                    <p/>
                    Graph - Performance per month<br/>
                    Graph - Trips per month<br/>
                    Graph - Days/Month occupied<br/>
                  </Paper>

                  {/* Padding */}
                  <Item sx={{ width: '1%' }}></Item>
                </>
              ))}
            </Stack>
          </>
        );
      })}

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
        </Stack>
      )}
    </>
  );
}

export default Dashboard;