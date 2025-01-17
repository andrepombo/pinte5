import React, { useEffect, useState } from "react";
import { Drawer, IconButton, List } from "@mui/material";
import { Home as HomeIcon, ArrowBack as ArrowBackIcon, HomeWork as HomeWorkIcon, People } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import classNames from "classnames"; // Ensure classNames is correctly imported
import {
  DrawerContainer,
  DrawerOpen,
  DrawerClose,
  Toolbar,
  MobileBackButton,
  SidebarList,
} from "./styles"; // Ensure the styles are correct and working
import SidebarLink from "./components/SidebarLink/SidebarLink";
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 2, label: "Obras", link: "/app/tables", icon: <HomeWorkIcon /> },
  { id: 15, label: "Colaboradores", link: "/app/colaboradores", icon: <People /> },
  { id: 16, label: "Usuários", link: "/app/users", icon: <People /> },
];

const structure2 = [
  { id: 2, label: "Obras", link: "/app/tables", icon: <HomeWorkIcon /> },
];

function Sidebar({ location }) {
  const theme = useTheme();
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // Parse JWT token
  const parseJwt = (token) => {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  const userInfo = parseJwt(localStorage.getItem("access_token"));
  const is_staff = userInfo?.is_staff;
  const menuStructure = is_staff ? structure : structure2;

  const [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

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
      onClose={() => toggleSidebar(layoutDispatch)} // Close sidebar for temporary variant
    >
      <Toolbar />
      <MobileBackButton>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon />
        </IconButton>
      </MobileBackButton>
      <SidebarList>
        {menuStructure.map((link) => (
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
}

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

export default Sidebar;
