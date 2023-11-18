'use client';

import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SideBarMenuItem, { SideBarMenuItemProps } from './SideBarMenuItem';
import {KeyboardArrowDownOutlined} from '@mui/icons-material';
import {useState} from 'react';
import {usePathname} from 'next/navigation';

export interface SideBarMenuGroupProps {
  label: string;
  items: SideBarMenuItemProps[];
}

export default function SideBarMenuGroup(props: SideBarMenuGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
        pb: open ? 1 : 0,
      }}
    >
      <ListItemButton
        alignItems="flex-start"
        onClick={() => setOpen(!open)}
        key={'1'}
        sx={{
          px: 3,
          pt: 2.0,
          pb: 1.5,
          "&:hover, &:focus": { "& svg": { opacity: 1 } },
        }}
      >
        <ListItemText
          primary={props.label}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: "bold",
            lineHeight: "16px",
            mb: "2px",
          }}
          sx={{ my: 0 }}
        />
        <KeyboardArrowDownOutlined
          sx={{
            mr: -1,
            opacity: 1,
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "0.2s",
          }}
        />
      </ListItemButton>
      {open && props.items.map((item) => SideBarMenuItem(item))}
    </Box>
  );
}