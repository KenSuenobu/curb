import {LinearProgress, Typography} from '@mui/material';

export interface LoadingMessageProps {
  label: string,
}

const LoadingMessage = (props: LoadingMessageProps) => {
  return (
    <>
      <Typography>
        {props.label}
      </Typography>
      <p/>
      <LinearProgress/>
    </>
  );
}

export default LoadingMessage;