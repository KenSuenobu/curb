import LoginForm from '@/app/components/login/LoginForm';
import {Typography} from '@mui/material';

const Login = () => {

  return (
    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <div style={{display: 'flex', border: '1px solid #000'}}>
        <div style={{
          backgroundColor: '#66f', textAlign: 'center', paddingTop: '2em', paddingBottom: '2em',
          paddingLeft: '1em', paddingRight: '1em', width: '300px', borderRight: '1px solid #000'
        }}>
          <Typography variant={'h4'} fontWeight={'bold'}>
            CURB
          </Typography>
          <p/>
          <Typography>
            <b>Welcome to Curb</b><br/>
            The simplified, enterprise,<br/>
            fleet management software<br/>
            for the rest of us.
          </Typography>
        </div>

        <LoginForm/>
      </div>
    </div>
  );
}

export default Login;