import { styled } from "@mui/material/styles";
import { CardContent } from "@mui/material";
export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  "& .title": {
    color: theme.palette.primary.main,
    fontSize: theme.typography.h6.fontSize,
    marginBottom: theme.spacing(1),
  },
  "& .summary": {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 1.5,
    margin: `${theme.spacing(1)} 0`,
  },
}));
