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
  BackupTableOutlined, PeopleOutline, LockOutlined, DataObjectOutlined, DirectionsCarOutlined,
} from '@mui/icons-material';
import CarDefinitions from './car-definitions';

const drawerWidth = 240;

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = React.useState(<></>);
  const carItems: SideBarMenuGroupProps = {
    label: "CARS",
    items: [
      {
        icon: <DirectionsCarOutlined/>,
        label: 'Car Definitions',
        onClick: () => setCurrentPage(<CarDefinitions/>),
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
      <SideBar width={260} sidebarItems={[carItems,]} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
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