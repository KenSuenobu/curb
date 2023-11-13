import {Typography} from '@mui/material';
import Divider from '@mui/material/Divider';

const WhatsNew = () => {
  const newItems = [
    {
      header: 'November 12, 2023 - v0.0.2',
      text:
        <>
          <Typography>
            This release introduces the ability to save guest information.
          </Typography>
        </>
    },
    {
      header: 'November 12, 2023',
      text:
        <>
          <Typography>
            <b>The First Release of CURB!</b>
            <p/>
            Welcome to the first release of CURB, and if you&apos;re a first time user, welcome to CURB!  CURB is a fleet
            management system that accompanies your hosting use of Turo, getAround, Uber Car Share, and so much more.
            Even if you own your own car rental company, and need a way to manage your fleet, CURB is your one stop
            shop for these features.
            <p/>
            There are currently two completed sections in the application so far: Car Definitions (under CARS) and Fleet Cars (under FLEET).
            Car Definitions define the types of cars that can be added to a fleet, so the more complete the data, the
            better.  Car Definitions are available to all users on the platform, so please be as complete as possible.
            Do not vandalize the data - changes are recorded by the system.
            <p/>
            Fleet Cars allow you to create a fleet (the name of your company), as well as the different cars that are
            assigned to each fleet: make, model, year, and trim.  Once you add a fleet car, you can add information such
            as ownership in the fleet, insurance details, VIN details, and much more.
            <p/>
            This is a complex platform.  If you&apos;re finding things are difficult to navigate, or would like to see a
            flow change, please feel free to reach out to the development team.
            <p/>
            More features are being added to the platform on a weekly basis.  Keep checking back for more!
          </Typography>
        </>
    }
  ];

  return (
    <>
      <Typography fontWeight={'bold'} fontSize={'24px'}>What&apos;s New?</Typography>
      <p/>
      {newItems.map((x: any, count: number) => (
        <div key={count}>
          <Typography fontSize={'18px'}>{x.header}</Typography>
          <blockquote>
            {x.text}
          </blockquote>
          <p/>
          <Divider/>
          <p/>
        </div>
      ))}
    </>
  );
}

export default WhatsNew;
