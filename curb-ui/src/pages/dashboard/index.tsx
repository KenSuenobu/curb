import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {errorDialog} from '@/components/dialogs/ConfirmDialog';
import {Paper, Stack, TextField, Typography} from '@mui/material';
import Item from '@/components/common/Item';

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

  const rows = Math.round(dashboardData.length / 3);
  const dashboardRows: any[] = [];

  for (let i = 0; i < rows; i++) {
    dashboardRows.push([]);
    for (let col = 0; col < 3; col++) {
      dashboardRows[i].push(dashboardData[(i * 3) + col]);
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
                  <Paper sx={{ width: '33%',
                    textAlign: 'left',
                    border: '1px solid #ccc',
                    padding: '4px',
                    paddingLeft: '6px' }}>
                    <Typography variant={'h4'} fontWeight={'bold'}>
                      {y.makeName}
                    </Typography>
                    <Typography>
                      {y.carYear} {y.modelName} {y.trimName} "{y.data.listingNickname}"
                    </Typography>
                    <p/>
                    <Stack direction={'row'}>
                      <Item sx={{ width: '50%', textAlign: 'left', padding: '0px' }}>
                        Gross: $ {parseFloat(y.grossTotal ?? '0.00').toFixed(2)}<br/>
                        Loans: $ {parseFloat(y.loanTotal ?? '0.00').toFixed(2)}
                      </Item>

                      <Item sx={{ width: '50%', textAlign: 'right', padding: '0px' }}>
                        Profit: $ {parseFloat(y.grossTotal ?? '0.00').toFixed(2) - parseFloat(y.loanTotal ?? '0.00').toFixed(2)}
                      </Item>
                    </Stack>

                    {y.nextTrip && (
                      <>
                        Next Trip: {y.nextTrip}
                        Delivery: Home
                      </>
                    )}
                    <p/>
                    Total Trips: {y.tripsCount}<br/>
                    Total Upcoming Trips: 2<br/>
                    Current Status: Rented<br/>
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
    </>
  );
}

export default Dashboard;