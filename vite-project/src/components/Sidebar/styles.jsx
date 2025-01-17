import { styled } from "@mui/system";
import { Drawer } from "@mui/material";
import { List } from "@mui/material";

const drawerWidth = 2;

export const DrawerContainer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
});

export const DrawerOpen = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export const DrawerClose = styled(Drawer)(({ theme }) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 200, // Adjust width for closed state
  [theme.breakpoints.down("sm")]: {
    width: 200 // Same for mobile
  },
}));

export const Toolbar = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export const MobileBackButton = styled("div")({
  marginTop: "0.5rem",
  marginLeft: "18px",
  "@media (max-width: 600px)": {
    marginTop: "0.625rem",
  },
  "@media (min-width: 768px)": {
    display: "none",
  },
});

export const SidebarList = styled(List)({
  paddingTop: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Center align icons
  ".MuiListItemIcon-root": {
    justifyContent: "center",
  },
});
