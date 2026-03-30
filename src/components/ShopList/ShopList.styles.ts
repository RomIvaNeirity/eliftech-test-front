export const shopListStyles = {
  paper: { p: 2, borderRadius: 2 },
  title: { fontWeight: "bold", px: 1 },
  noShops: { py: 2 },
  listItem: (isSelected: boolean, isCartShop: boolean) => ({
    mb: 1,
    borderRadius: 1,
    // Якщо це магазин з кошика — малюємо зелену рамку, інакше стандартну
    border: isCartShop ? "2px solid #2e7d32" : "1px solid #eee",
    "&.Mui-selected": {
      backgroundColor: "rgba(46, 125, 50, 0.08)",
      borderColor: "success.main",
    },
    transition: "all 0.2s ease-in-out",
  }),
  cartIcon: {
    color: "#2e7d32",
    fontSize: "1.2rem",
    ml: 1,
  },
};
