export const shopListStyles = {
  paper: { p: 2, borderRadius: 2 },

  controlsStack: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  filtersWrapper: {
    display: "flex",
    // До tablet (768) - в ряд, після - в колонку
    flexDirection: { xs: "row", tablet: "column" },
    flexWrap: "wrap",
    gap: 1,
  },

  mobileSelect: {
    // Селект: показуємо на xs (мобілка), ХОВАЄМО на tablet (768+)
    display: { xs: "flex", tablet: "none" },
    width: "100%",
  },

  desktopList: {
    // Список: ХОВАЄМО на xs, ПОКАЗУЄМО на tablet (768+)
    display: { xs: "none", tablet: "block" },
    mt: 2,
  },

  listItem: (isSelected: boolean, isCartShop: boolean) => ({
    mb: 1,
    borderRadius: 1,
    border: isCartShop ? "2px solid #2e7d32" : "1px solid #eee",
    "&.Mui-selected": {
      backgroundColor: "rgba(46, 125, 50, 0.08)",
      borderColor: "success.main",
    },
  }),

  cartIcon: { color: "#2e7d32", ml: 1 },
};
