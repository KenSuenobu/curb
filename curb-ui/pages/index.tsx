import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NextPage } from "next";
import MainAppBar from "../components/MainAppBar";
import SideBar from "../components/SideBar";
import { SideBarMenuGroupProps } from "../components/SideBarMenuGroup";
import {
  ClassOutlined,
  FormatListBulletedOutlined,
  GroupsOutlined,
  PersonOutlined,
  ReorderOutlined,
  RuleOutlined,
  TypeSpecimenOutlined,
  ViewListOutlined,
  PublicOutlined,
  WorkspacesOutlined,
  Grid3x3Outlined,
  DatasetOutlined,
  DatasetLinkedOutlined,
  LibraryBooksOutlined,
  BackupTableOutlined,
  PeopleOutline,
  LockOutlined,
  DataObjectOutlined,
  DirectionsCarOutlined,
  GarageOutlined,
  MoneyOutlined,
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  PersonRemoveOutlined,
  PersonOffOutlined,
  LocalAtmOutlined,
} from '@mui/icons-material';
import CarDefinitions from './car-definitions';
import Fleet from "./fleet";
import FleetLoans from './fleet-loans';

const drawerWidth = 240;

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = React.useState(<></>);
  const carItems: SideBarMenuGroupProps = {
    label: 'Cars',
    items: [
      {
        icon: <DirectionsCarOutlined/>,
        label: 'Car Definitions',
        onClick: () => setCurrentPage(<CarDefinitions/>),
      },
    ],
  };
  const fleetItems: SideBarMenuGroupProps = {
    label: 'Fleet',
    items: [
      {
        icon: <GarageOutlined/>,
        label: 'Fleet Cars',
        onClick: () => setCurrentPage(<Fleet/>),
      },
      {
        icon: <MoneyOutlined/>,
        label: 'Fleet Car Loans',
        onClick: () => setCurrentPage(<FleetLoans/>),
      },
    ],
  };
  const tripsItems: SideBarMenuGroupProps = {
    label: 'Trips',
    items: [
      {
        icon: <CalendarTodayOutlined/>,
        label: 'Today\'s Trips',
        onClick: () => setCurrentPage(<></>),
      },
      {
        icon: <DirectionsCarOutlined/>,
        label: 'Future Trips',
        onClick: () => setCurrentPage(<></>),
      },
      {
        icon: <CalendarMonthOutlined/>,
        label: 'Past Trips',
        onClick: () => setCurrentPage(<></>),
      },
    ],
  };
  const guestsItems: SideBarMenuGroupProps = {
    label: 'Guests',
    items: [
      {
        icon: <PersonOutlined/>,
        label: 'Guests',
        onClick: () => setCurrentPage(<></>),
      },
      {
        icon: <PersonOffOutlined/>,
        label: 'Blacklisted Guests',
        onClick: () => setCurrentPage(<></>),
      },
    ],
  };
  const financialsItems: SideBarMenuGroupProps = {
    label: 'Financials',
    items: [
      {
        icon: <LocalAtmOutlined/>,
        label: 'Monthly Payouts',
        onClick: () => setCurrentPage(<></>),
      },
    ],
  };
  // const accountsItems: SideBarMenuGroupProps = {
  //   label: "ACCOUNTS",
  //   items: [
  //     {
  //       icon: <PeopleOutline/>,
  //       label: "Users",
  //       onClick: () => setCurrentPage(<Users/>),
  //     },
  //     {
  //       icon: <GroupsOutlined/>,
  //       label: "Groups",
  //       onClick: () => setCurrentPage(<Groups/>),
  //     },
  //     {
  //       icon: <LockOutlined/>,
  //       label: "Permissions",
  //       onClick: () => setCurrentPage(<Permissions/>),
  //     },
  //   ],
  // };
  // const componentsItems: SideBarMenuGroupProps = {
  //   label: "COMPONENTS",
  //   items: [
  //     {
  //       icon: <Grid3x3Outlined/>,
  //       label: "Namespaces",
  //       onClick: () => setCurrentPage(<Namespaces/>),
  //     },
  //     {
  //       icon: <TypeSpecimenOutlined/>,
  //       label: "Data Types",
  //       onClick: () => setCurrentPage(<DataTypes/>),
  //     },
  //     {
  //       icon: <LibraryBooksOutlined/>,
  //       label: "Classes",
  //       onClick: () => setCurrentPage(<Classes/>),
  //     },
  //     {
  //       icon: <DatasetOutlined/>,
  //       label: "Fields",
  //       onClick: () => setCurrentPage(<Fields/>),
  //     },
  //     {
  //       icon: <DatasetLinkedOutlined/>,
  //       label: "Properties",
  //       onClick: () => setCurrentPage(<Properties/>),
  //     },
  //     {
  //       icon: <PublicOutlined />,
  //       label: "Class Properties",
  //       onClick: () => setCurrentPage(<ClassProperties/>),
  //     },
  //     {
  //       icon: <BackupTableOutlined />,
  //       label: 'Instances',
  //       onClick: () => setCurrentPage(<Instances/>),
  //     }
  //     /*      {
  //             icon: <ClassOutlined/>,
  //             label: "Schemas",
  //             onClick: () => setCurrentPage(<></>),
  //           },
  //           {
  //             icon: <ClassOutlined/>,
  //             label: "Instances",
  //             onClick: () => setCurrentPage(<></>),
  //           },
  //           {
  //             icon: <ClassOutlined/>,
  //             label: "Instance Data",
  //             onClick: () => setCurrentPage(<></>),
  //           },
  //     */
  //   ],
  // };
  // const instanceItems = {
  //   label: 'INSTANCES',
  //   items: [
  //     {
  //       icon: <DataObjectOutlined/>,
  //       label: 'Data Records',
  //       onClick: () => setCurrentPage(<></>),
  //     },
  //     {
  //       icon: <LibraryBooksOutlined/>,
  //       label: 'Data Batches',
  //       onClick: () => setCurrentPage(<></>),
  //     },
  //   ],
  // };

  function callTest() {
    console.log('test');
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideBar width={260} sidebarItems={[carItems, fleetItems, tripsItems, guestsItems, financialsItems, ]} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: '#fff'  }}
        position={"relative"}
        left={260}
        marginRight={"260px"}
      >
        {currentPage}
      </Box>
    </Box>
  );
};

export default Home;