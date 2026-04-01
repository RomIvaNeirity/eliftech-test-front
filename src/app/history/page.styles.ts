import { SxProps, Theme } from "@mui/material";

export const historyStyles: Record<string, SxProps<Theme>> = {
  container: {
    mt: 4,
    pb: 4,
  },
  pageTitle: {
    fontWeight: "bold",
    mb: 4,
    fontSize: { xs: "1.5rem", mobile: "2.125rem" },
    textAlign: { xs: "center", mobile: "left" },
  },
  searchPaper: {
    p: 3,
    borderRadius: 2,
    position: "sticky",
    top: 20,
    // Можна додати boxShadow: 3 тут, якщо хочеш, щоб форма пошуку теж мала тінь
  },
  searchBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mt: 2,
  },
  accordion: {
    mb: 2,
    borderRadius: "12px !important",
    overflow: "hidden",
    boxShadow: 2,
    "&:before": { display: "none" },
  },
  orderTotal: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  itemRow: {
    display: "flex",
    gap: 2,
    alignItems: "center",
    py: 1,
  },
  productAvatar: {
    width: 70,
    height: 60,
    borderRadius: 2,
  },
  // ОСЬ ТУТ ЗМІНИ: Прибрано пунктир (dashed), додано тінь та білий фон
  emptyState: {
    p: { xs: 3, mobile: 5 },
    textAlign: "center",
    border: "none",
    /* borderRadius: 2, */
    bgcolor: "background.paper",
    /* boxShadow: 3, */
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
