import { SxProps, Theme } from "@mui/material";

export const cartStyles: Record<string, SxProps<Theme>> = {
  container: {
    mt: { xs: 2, tablet: 4 },
    pb: 4,
  },
  gridContainer: {
    // На мобільці робимо більший відступ між формою та списком товарів
    rowGap: { xs: 4, tablet: 0 },
  },
  formWrapper: {
    // Можна додати sticky, щоб форма була на місці, поки скролиш довгий список товарів
    position: { xs: "static", tablet: "sticky" },
    top: 24,
  },
  listWrapper: {
    // Контейнер для списку товарів
  },
};
