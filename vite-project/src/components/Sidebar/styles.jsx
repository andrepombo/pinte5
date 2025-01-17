import { styled } from "@mui/system";
import { Drawer } from "@mui/material";

const drawerWidth = 240;

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
  width: theme.spacing(7) + 40,
  [theme.breakpoints.down("sm")]: {
    width: drawerWidth,
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

export const SidebarList = styled("div")({
  paddingTop: "20px",
});
