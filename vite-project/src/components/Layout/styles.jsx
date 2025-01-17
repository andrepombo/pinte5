import { styled } from "@mui/system";

// Replace `makeStyles` with `styled`
const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  maxWidth: '100vw',
  overflowX: 'hidden',
}));

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  width: `calc(100vw - 240px)`,
  minHeight: '100vh',
}));

const ContentShift = styled('main')(({ theme }) => ({
  width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const FakeToolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Link = styled('a')(({ theme }) => ({
  '&:not(:first-child)': {
    paddingLeft: 15,
  },
}));

export { Root, Content, ContentShift, FakeToolbar, Link };
