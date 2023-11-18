import {Typography} from '@mui/material';
import Divider from '@mui/material/Divider';

const WhatsNew = () => {
  const newItems = [
    {
      header: 'November 19, 2023 - v0.0.5',
      text:
        <>
          <Typography>
            The following items have been improved:
            <p/>
            <ul>
              <li> Improved delivery address list - now accepts an address category, and shows an icon representing the category</li>
              <li> Guest list has been improved</li>
              <li> Fleet car list now shows the color of the car</li>
              <li> Fleet car list now shows the license plate of the car</li>
              <li> Guest list detail now indicates if the guest is an incomplete record</li>
            </ul>
          </Typography>
        </>
    },
    {
      header: 'November 18, 2023 - v0.0.4',
      text:
        <>
          <Typography>
            This release adds the ability to store trips.  This is the first pass at the trip recording; there will be
            more changes and improvements in the next few days.
          </Typography>
        </>
    },
    {
      header: 'November 17, 2023 - v0.0.3',
      text:
        <>
          <Typography>
            Community now includes the ability to define Delivery Addresses for upcoming trip functionality.
            <p/>
            This means, you can start adding delivery address data to the database for your own fleet, as well as
            the entire community.  Community addresses can include addresses like airports, nearby hotels,
            park-and-ride locations, and the like.
            <p/>
            Several other cosmetic changes and flow changes have been introduced.  Car definitions now displays
            the total number of definitions that are contributed, and the total your fleet has defined.
            <p/>
            Guests now have the ability to blacklist or whitelist guests at any time.  If a guest, for example,
            causes an issue and you want to keep track of that issue, simply add the guest note, and save it.
            You can then blacklist or whitelist your guest based on the note.
          </Typography>
        </>
    },
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
      <Typography fontWeight={'bold'} fontSize={'24px'}>What&apos;s New? (Sorted by date, descending order.)</Typography>
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
