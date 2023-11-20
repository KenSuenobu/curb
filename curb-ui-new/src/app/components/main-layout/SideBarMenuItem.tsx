import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {usePathname, useRouter} from 'next/navigation';
import {SELECTED_MENU_COLOR} from '@/app/components/common/ColorDatabase';

export interface SideBarMenuItemProps {
  icon: JSX.Element;
  label: string;
  url: string;
  info: any;
  disabled?: boolean;
}

export default function SideBarMenuItem(props: SideBarMenuItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname.endsWith(props.url);

  function goToRoute(e: any) {
    e.preventDefault();
    router.push(props.url);
  }

  if (selected) {
    return (
      <ListItemButton
        key={props.label}
        sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)", backgroundColor: SELECTED_MENU_COLOR }}
        disabled={props.disabled ?? false}
        onClick={(e) => goToRoute(e)}
      >
        <ListItemIcon sx={{ color: "inherit" }}>{props.icon}</ListItemIcon>
        <ListItemText
          primary={props.label}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: "medium",
          }}
        />
      </ListItemButton>
    );
  }

  return (
    <ListItemButton
      key={props.label}
      sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
      disabled={props.disabled ?? false}
      onClick={(e) => goToRoute(e)}
    >
      <ListItemIcon sx={{ color: "inherit" }}>{props.icon}</ListItemIcon>
      <ListItemText
        primary={props.label}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: "medium",
        }}
      />
    </ListItemButton>
  );
}