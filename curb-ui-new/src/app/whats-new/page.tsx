import {Accordion, AccordionDetails, AccordionSummary, Link, Typography} from '@mui/material';
import Divider from '@mui/material/Divider';
import {ExpandMoreOutlined} from '@mui/icons-material';

const WhatsNew = () => {
  const newItems = [
    {
      header: 'v0.0.10',
      text:
        <>
          <Typography>
            The following improvements have been made:
            <p/>
            <ul>
              <li> #107: Added the ability to enable/disable a car entry (Listed/Delisted)</li>
              <li> #108: Any delisted cars are no longer displayed in the Dashboard</li>
              <li> #38: Active/inactive covered by #107</li>
              <li> #95: Vehicle indication status now indicates red when disabled</li>
            </ul>
          </Typography>
        </>
    },
    {
      header: 'v0.0.9',
      text:
        <>
          <Typography>
            The following improvements have been made:
            <p/>
            <ul>
              <li> #92: Displays guest counts</li>
              <li> #99: Clear form in trip form now deselects form elements properly</li>
              <li> #106, #86: Adds year dropdown selection to the dashboard</li>
            </ul>
          </Typography>
        </>
    },
    {
      header: 'v0.0.8',
      text:
        <>
          <Typography>
            The following improvements have been made:
            <p/>
            <ul>
              <li> Trips can now be edited if new trip information is obtained, or if a trip itinerary changes</li>
              <li> Formatting changes in the trips editing page</li>
              <li> Snackbar now displays when records are saved or edited</li>
              <li> Fixed trip airline selection dropdown</li>
              <li> Airline information now shown in the dashboard</li>
              <li> Dashboard now shows mileage totals</li>
              <li> Input fixes so that numeric fields only accept numeric values</li>
              <li> #103: Re-enabled the ability to add fleet car entries</li>
              <li> #102: General optimizations to code</li>
            </ul>
          </Typography>
        </>
    },
    {
      header: 'v0.0.7',
      text:
        <>
          <Typography>
            You can now keep track of fleet car loan information!  This can be used to keep track of the lein holder
            information, as well as any banking or loan account data you need to track the car.
            <p/>
            The following improvements have been made:
            <p/>
            <ul>
              <li> Trip screen is now more concise instead of having the header above the table, the top layer already shows the page</li>
              <li> Header kept popping up for no reason on some pages - this is fixed</li>
              <li> Initial dashboard is in place, why not add some cars and trips?</li>
              <li> Older news is now shown in an expandable area below the first news item</li>
              <li> <Link href={'https://github.com/KenSuenobu/curb/issues/80'} target={'_blank'}>Issue #80:</Link> Bug fix, trip cannot end before the trip starts</li>
              <li> CURB is now VURB: <b>Vehicle Universal Rental Business Fleet</b></li>
            </ul>
          </Typography>
        </>
    },
    {
      header: 'v0.0.6',
      text:
        <>
          <Typography>
            Past, Current, and Upcoming trips are now included.
            <p/>
            The following improvements have been made:
            <p/>
            <ul>
              <li> Guest information in trips now shows the guest name: last, first</li>
              <li> Trips in the trip list can be deleted</li>
            </ul>
          </Typography>
        </>
    },
    {
      header: 'v0.0.5',
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
              <li> Menu icon has been improved</li>
              <li> Sidebar navigation has been improved to highlight the current page</li>
              <li> Added FlightAware data to trips</li>
            </ul>
          </Typography>
        </>
    },
    {
      header: 'v0.0.4',
      text:
        <>
          <Typography>
            This release adds the ability to store trips.  This is the first pass at the trip recording; there will be
            more changes and improvements in the next few days.
          </Typography>
        </>
    },
    {
      header: 'v0.0.3',
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
      header: 'v0.0.2',
      text:
        <>
          <Typography>
            This release introduces the ability to save guest information.
          </Typography>
        </>
    },
    {
      header: 'First Release',
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
      {[newItems[0]].map((x: any) => (
        <div key={0}>
          <Typography fontSize={'18px'}>{x.header}</Typography>
          <blockquote>
            {x.text}
          </blockquote>
          <p/>
        </div>
      ))}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreOutlined/>}
        style={{ backgroundColor: '#ddf', borderTop: '1px solid #000'}}>
          <Typography>
            Older News
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {newItems.map((x: any, count: number) => {
            // Skip the first whats-new item since these will be put into an accordion.
            if (count === 0) {
              return (<></>);
            }

            return (
              <div key={count}>
                <Typography fontSize={'18px'}>{x.header}</Typography>
                <blockquote>
                  {x.text}
                </blockquote>
                <p/>
                <Divider/>
                <p/>
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default WhatsNew;
