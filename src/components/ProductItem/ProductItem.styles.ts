// src/components/ProductItem/ProductItem.styles.ts

export const productItemStyles = {
  card: (isInCart: boolean) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 2,
    position: "relative",
    transition: "0.2s",
    "&:hover": { boxShadow: isInCart ? 1 : 4 },
  }),
  mediaContainer: {
    position: "relative",
  },
  media: (isInCart: boolean) => ({
    objectFit: "cover",
    filter: isInCart ? "grayscale(30%)" : "none",
    opacity: isInCart ? 0.8 : 1,
  }),
  badge: {
    position: "absolute",
    top: 20,
    right: 25,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    p: 2,
  },
  category: {
    textTransform: "uppercase",
    mb: 0.5,
  },
  title: {
    lineHeight: 1.2,
    mb: 1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    minHeight: "2.4em",
  },
  price: {
    fontWeight: "bold",
    mb: 1.5,
  },
  button: (isInCart: boolean) => ({
    textTransform: "none",
    fontWeight: "bold",
    "&.Mui-disabled": {
      backgroundColor: "#2e7d32",
      color: "rgba(255, 255, 255, 0.7)",
      opacity: 0.6,
    },
  }),
};
