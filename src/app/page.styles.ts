import { SxProps, Theme } from "@mui/material";

export const homeStyles: Record<string, SxProps<Theme>> = {
  mainContainer: {
    py: { xs: 2, tablet: 4 }, // Менше відступів на моб, більше на планшеті/десктопі
  },
  gridContainer: {
    // На мобільці (xs) додаємо відступ між списком магазинів та товарами
    rowGap: { xs: 3, mobile: 0 }, 
  },
  shopSection: {
    // Наприклад, рамка або фон для списку магазинів
    p: 2,
    bgcolor: "#f8f9fa",
    borderRadius: "8px",
    height: "fit-content",
  }
};