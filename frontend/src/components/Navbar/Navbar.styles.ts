import { AppBar, Toolbar, styled as muiStyled } from "@mui/material";

const StyledAppBar = muiStyled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledToolbar = muiStyled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  padding: theme.spacing(1),
  [`${theme.breakpoints.up("sm")}`]: {
    padding: theme.spacing(2),
  },
  [`${theme.breakpoints.down("sm")}`]: {
    minHeight: 56,
  },
  [`${theme.breakpoints.up("sm")}`]: {
    minHeight: 64,
  },
}));

export { StyledAppBar, StyledToolbar };
