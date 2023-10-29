import {Typography} from '@mui/material';
import Divider from '@mui/material/Divider';

const WhatsNew = () => {
  const newItems = [
    {
      header: 'October 28, 2023',
      text:
        <>
          <Typography>
            <b>The First Release of CURB to the public!</b>
            <p/>
            Welcome to the first release of CURB, and if you&apos;re a first time user, welcome to CURB!  CURB is a fleet
            management system that accompanies your hosting use of Turo, getAround, Uber Car Share, and so much more.
            Even if you own your own car rental company, and need a way to manage your fleet, CURB is your one stop
            shop for these features.
            <p/>
            This first release is very simple.  It only contains information about Car Definitions, which are cars
            that you can buy in your region.  Since this software is not restricted to any one market, you may notice
            cars available in Canada, Europe, India, and other countries.
            <p/>
            We don&apos;t want to omit any cars, and we certainly don&apos;t want to omit users.  The car definitions listed
            here may or may not be complete.  If you have the time and effort, please feel free to create or update
            a car definition so that it&apos;s more complete.  The car definitions will be used in the platform to define
            the cars that are part of your fleet, and that information is used to determine profitability, profit
            and loss tables, and so much more.  The more complete the data, the better.
          </Typography>
        </>
    }
  ];

  return (
    <>
      <Typography fontWeight={'bold'} fontSize={'24px'}>What&apos;s New?</Typography>
      <p/>
      {newItems.map((x) => (
        <>
          <Typography fontSize={'18px'}>{x.header}</Typography>
          <blockquote>
            {x.text}
          </blockquote>
          <p/>
          <Divider/>
          <p/>
        </>
      ))}
    </>
  );
}

export default WhatsNew;
