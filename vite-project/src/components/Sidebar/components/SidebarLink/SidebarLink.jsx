import React, { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Inbox as InboxIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import {
  LinkStyled,
  ExternalLink,
  LinkIconStyled,
  LinkTextStyled,
  DividerStyled,  // Make sure this import is correct
  SectionTitleStyled
} from "./styles";  // Adjust the path based on your folder structure

// components
import Dot from "../Dot";

export default function SidebarLink({
  link,
  icon,
  label,
  children,
  location = {}, // Add a fallback to avoid undefined
  isSidebarOpened,
  nested,
  type,
}) {
  // Local state
  const [isOpen, setIsOpen] = useState(false);

  // Safely check if location.pathname is available before using indexOf
  const isLinkActive =
    link && 
    (location.pathname === link || (location.pathname && location.pathname.indexOf(link) !== -1));

  if (type === "title")
    return (
      <SectionTitleStyled className={classnames({ hidden: !isSidebarOpened })}>
        {label}
      </SectionTitleStyled>
    );

  if (type === "divider") return <DividerStyled />;
  if (link && link.includes("http")) {
    return (
      <ListItem
        button
        className={classnames({
          active: isLinkActive && !nested,
          nested,
        })}
        disableRipple
      >
        <ExternalLink href={link}>
          <LinkIconStyled className={classnames({ active: isLinkActive })}>
            {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
          </LinkIconStyled>
          <ListItemText
            primary={
              <LinkTextStyled
                className={classnames({ active: isLinkActive, hidden: !isSidebarOpened })}
              >
                {label}
              </LinkTextStyled>
            }
          />
        </ExternalLink>
      </ListItem>
    );
  }
  
  if (!children)
    return (
      <ListItem
        button
        component={link && Link}
        to={link}
        className={classnames({ active: isLinkActive && !nested, nested })}
        disableRipple
      >
        <LinkIconStyled className={classnames({ active: isLinkActive })}>
          {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
        </LinkIconStyled>
        <ListItemText
          primary={
            <LinkTextStyled
              className={classnames({ active: isLinkActive, hidden: !isSidebarOpened })}
            >
              {label}
            </LinkTextStyled>
          }
        />
      </ListItem>
    );

  return (
    <>
      <ListItem
        button
        component={link && Link}
        onClick={toggleCollapse}
        className={classnames({ active: isLinkActive })}
        disableRipple
      >
        <LinkIconStyled className={classnames({ active: isLinkActive })}>
          {icon ? icon : <InboxIcon />}
        </LinkIconStyled>
        <ListItemText
          primary={
            <LinkTextStyled
              className={classnames({ active: isLinkActive, hidden: !isSidebarOpened })}
            >
              {label}
            </LinkTextStyled>
          }
        />
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className="nestedList"
        >
          <List component="div" disablePadding>
            {children.map((childrenLink) => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

  // ###########################################################

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
