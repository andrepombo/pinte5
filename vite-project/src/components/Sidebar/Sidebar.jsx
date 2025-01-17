import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@mui/material";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  HomeWork as HomeWorkIcon,
  People,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import classNames from "classnames";

// styles (using styled instead of makeStyles)
import { DrawerContainer, DrawerOpen, DrawerClose, Toolbar, MobileBackButton, SidebarList } from './styles'; 

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";


const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 2, label: "Obras", link: "/app/tables", icon: <HomeWorkIcon /> },
  { id: 15, label:"Colaboradores", link: "/app/colaboradores", icon: <People />},
  { id: 16, label:"Usuários", link: "/app/users", icon: <People />},
];

const structure2 = [
  { id: 2, label: "Obras", link: "/app/tables", icon: <HomeWorkIcon /> },
];

function Sidebar({ location }) {
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  }, []);

  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  const userInfo = parseJwt(localStorage.getItem('access_token'));
  const is_staff = userInfo.is_staff;

  var structure3 = is_staff ? structure : structure2;

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames({
        [DrawerContainer]: true,
        [DrawerOpen]: isSidebarOpened,
        [DrawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [DrawerOpen]: isSidebarOpened,
          [DrawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <Toolbar />
      <MobileBackButton>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon />
        </IconButton>
      </MobileBackButton>
      <SidebarList>
        {structure3.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </SidebarList>
    </Drawer>
  );

  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default Sidebar;
