import { SxProps, Theme } from "@mui/material";

export const cartStyles: Record<string, SxProps<Theme>> = {
  container: {
    mt: { xs: 2, tablet: 4 },
    pb: 4,
  },
  gridContainer: {
    rowGap: { xs: 4, tablet: 0 }, // Твої оригінальні гапи повернуто
  },
  formWrapper: {
    position: { xs: "static", tablet: "sticky" },
    top: 24,
  },
  listWrapper: {},
};
