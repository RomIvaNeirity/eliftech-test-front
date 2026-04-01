import { SxProps, Theme } from "@mui/material";

export const homeStyles: Record<string, SxProps<Theme>> = {
  mainContainer: {
    py: { xs: 2, tablet: 4 },
  },
  gridContainer: {
    rowGap: { xs: 3, mobile: 0 },
  },
  shopSection: {
    p: 2,
    bgcolor: "#f8f9fa",
    borderRadius: "8px",
    height: "fit-content",
  },
};
