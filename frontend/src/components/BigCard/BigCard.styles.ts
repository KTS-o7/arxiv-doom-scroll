import { Paper } from "@mui/material";

import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  maxWidth: 800,
  maxHeight: "90vh",
  width: "90%",
  overflow: "auto",
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));
