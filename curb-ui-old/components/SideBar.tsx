import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import SideBarMenuGroup, { SideBarMenuGroupProps } from './SideBarMenuGroup';
import SideBarMenuItem from './SideBarMenuItem';
import {HomeMiniOutlined} from '@mui/icons-material';
import {alertDialog} from './dialogs/ConfirmDialog';
import { useRouter } from 'next/router';

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export interface SideBarProps {
  width: number;
  sidebarItems: SideBarMenuGroupProps[],
  onHomeClicked: () => void,
}

export default function SideBar(props: SideBarProps) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }} position={"fixed"} top={0} height={"100%"}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: props.width }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" onClick={() => {
              props.onHomeClicked();
            }}>
              <ListItemText
                sx={{ my: 0, width: props.width - 40 }}
                primary="CURB"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            {props.sidebarItems.map((x, cnt) =>
              <SideBarMenuGroup label={x.label.toUpperCase()} key={cnt.toString(10)} items={x.items} />)}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}