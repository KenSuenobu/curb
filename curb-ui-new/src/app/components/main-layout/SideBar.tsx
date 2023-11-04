import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import SideBarMenuGroup, { SideBarMenuGroupProps } from './SideBarMenuGroup';
import {ListItem, Stack, Typography} from '@mui/material';
import {InfoOutlined} from '@mui/icons-material';
import {useRouter} from 'next/navigation';

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

  const infoClicked = () => {
    router.push('/whats-new');
  }

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
            <ListItem>
              <ListItemButton component="a" onClick={() => {
                props.onHomeClicked();
              }} style={{ paddingLeft: '5px' }}>
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
              <ListItemButton onClick={() => infoClicked()}>
                <InfoOutlined/>
              </ListItemButton>
            </ListItem>
            <Divider />
            {props.sidebarItems.map((x, cnt) =>
              <SideBarMenuGroup label={x.label.toUpperCase()} key={cnt.toString(10)} items={x.items} />)}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}