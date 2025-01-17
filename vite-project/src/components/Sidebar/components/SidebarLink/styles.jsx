import { styled } from "@mui/system";
import { Divider, ListItem } from "@mui/material";

export const LinkStyled = styled(ListItem)({
  textDecoration: "none",
  "&:hover, &:focus": {
    backgroundColor: "#f0f0f0", // Modify this as needed
  },
});

export const ExternalLink = styled("a")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
});

export const LinkIconStyled = styled("div")({
  marginRight: 16,
  transition: "color 0.3s",
  width: 24,
  display: "flex",
  justifyContent: "center",
  "&.active": {
    color: "#1976d2", // Example active color
  },
});

export const LinkTextStyled = styled("span")({
  color: "#888",
  fontSize: 16,
  transition: "opacity 0.3s, color 0.3s",
  "&.active": {
    color: "#333", // Example active color
  },
  "&.hidden": {
    opacity: 0,
  },
});

export const SectionTitleStyled = styled("span")({
  marginLeft: 16,
  marginTop: 8,
  marginBottom: 8,
  fontSize: 16,
  fontWeight: "bold",
});

export const DividerStyled = styled(Divider)({
  marginTop: 16,
  marginBottom: 32,
  height: 1,
  backgroundColor: "#dcdcdc",
});

export const NestedList = styled("div")({
  paddingLeft: 16,
});
