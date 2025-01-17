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

  // Add theme to handleWindowWidthChange dependency
  useEffect(() => {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  }, [theme]); // Dependency on theme ensures correct updates

  // Function to handle window resizing and manage sidebar state
  const handleWindowWidthChange = () => {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md; // Get the breakpoint from the theme
    const isSmallScreen = windowWidth < breakpointWidth;

    // Update the sidebar state based on screen width
    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  };

  return (


    <Drawer
      variant="permanent"
      open={isSidebarOpened} // Keep Drawer open or closed based on state
      onClose={() => toggleSidebar(layoutDispatch)}
    >
      <DrawerOpen isSidebarOpened={isSidebarOpened}>
        <div>
          <IconButton onClick={() => setIsSidebarOpened(!isSidebarOpened)}>
            <ArrowBackIcon />
          </IconButton>
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
        </div>
      </DrawerOpen>
    </Drawer>
  );
    
}

export default Sidebar;



