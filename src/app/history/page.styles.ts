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
    top: 20, // Картка пошуку буде "липнути" при скролі на десктопі
  },
  searchBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mt: 2,
  },
  accordion: {
    mb: 2,
    borderRadius: "12px !important", // MUI іноді скидає радіус у акордеонів
    overflow: "hidden",
    boxShadow: 2,
    "&:before": { display: "none" }, // Прибираємо стандартну лінію MUI
  },
  accordionSummary: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    pr: 2,
    alignItems: "center",
  },
  orderTotal: {
    fontWeight: "bold",
    color: "#2c3e50", // Твій основний колір
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
    borderRadius: 2, // 8px
  },
  emptyState: {
    p: { xs: 3, mobile: 5 },
    textAlign: "center",
    border: "2px dashed #ccc",
    borderRadius: 4,
    bgcolor: "rgba(0,0,0,0.02)",
  },
};
