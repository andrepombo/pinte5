import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Fab, Typography } from "@mui/material";
import { Menu as MenuIcon, Person as AccountIcon, Send as SendIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { styled } from "@mui/system"; // Importing styled and alpha from MUI System

// components
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";

// context
import { useLayoutState, useLayoutDispatch, toggleSidebar } from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";

// Create styled components for your elements
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const HeaderMenuButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(1),
  },
}));

const Logotype = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  fontWeight: 500,
  fontSize: 18,
  whiteSpace: "nowrap",
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}));

const Grow = styled('div')({
  flexGrow: 1,
});

const HeaderIcon = styled(IconButton)(({ theme }) => ({
  fontSize: 28,
  color: "rgba(255, 255, 255, 0.35)",
}));

const ProfileMenuUser = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
}));

const ProfileMenuLink = styled('a')({
  fontSize: 16,
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
  },
});

const MessageNotification = styled('div')(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "&:hover, &:focus": {
    backgroundColor: theme.palette.background.light,
  },
}));

const SendMessageButton = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(4),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textTransform: "none",
}));

export default function Header(props) {
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const userDispatch = useUserDispatch();

  const [mailMenu, setMailMenu] = useState(null);
  const [notificationsMenu, setNotificationsMenu] = useState(null);
  const [profileMenu, setProfileMenu] = useState(null);

  function parseJwt(token) {
    if (!token) return;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  const userInfo = parseJwt(localStorage.getItem('access_token'));
  const username = userInfo.name;

  const messages = [
    {
      id: 0,
      variant: "warning",
      name: "Jane Hew",
      message: "Hey! How is it going?",
      time: "9:32",
    },
    {
      id: 1,
      variant: "success",
      name: "Lloyd Brown",
      message: "Check out my new Dashboard",
      time: "9:18",
    },
    {
      id: 2,
      variant: "primary",
      name: "Mark Winstein",
      message: "I want rearrange the appointment",
      time: "9:15",
    },
    {
      id: 3,
      variant: "secondary",
      name: "Liana Dutti",
      message: "Good news from sale department",
      time: "9:09",
    },
  ];

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <HeaderMenuButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon />
          ) : (
            <MenuIcon />
          )}
        </HeaderMenuButton>
        <Logotype variant="h6">Painel de Controle</Logotype>
        <Grow />
        <Typography variant="h6" color="inherit">
          {username}
        </Typography>
        <HeaderIcon
          aria-haspopup="true"
          color="inherit"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon />
        </HeaderIcon>

        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
        >
          <ProfileMenuUser>
            <Typography variant="h4">New Messages</Typography>
            <ProfileMenuLink href="#" color="secondary">
              {messages.length} New Messages
            </ProfileMenuLink>
          </ProfileMenuUser>
          {messages.map(message => (
            <MenuItem key={message.id}>
              <div>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography>{message.time}</Typography>
              </div>
              <div>
                <Typography>{message.name}</Typography>
                <Typography>{message.message}</Typography>
              </div>
            </MenuItem>
          ))}
          <SendMessageButton
            variant="extended"
            color="primary"
            aria-label="Add"
          >
            Send New Message
            <SendIcon />
          </SendMessageButton>
        </Menu>

        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
        >
          <ProfileMenuUser>
            <Typography variant="h4">{username}</Typography>
          </ProfileMenuUser>
          <MenuItem>
            <AccountIcon /> Profile
          </MenuItem>
          <MenuItem>
            <AccountIcon /> Tasks
          </MenuItem>
          <MenuItem>
            <AccountIcon /> Messages
          </MenuItem>
          <ProfileMenuUser>
            <ProfileMenuLink onClick={() => signOut(userDispatch, props.history)}>
              Sair
            </ProfileMenuLink>
          </ProfileMenuUser>
        </Menu>
      </StyledToolbar>
    </StyledAppBar>
  );
}
