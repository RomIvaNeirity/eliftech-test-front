import { SxProps, Theme } from "@mui/material";

export const cartItemStyles: Record<string, SxProps<Theme>> = {
  paper: {
    p: 3,
    borderRadius: 2,
    minHeight: "500px",
  },
  card: {
    mb: 2,
    p: 2,
    display: "flex",
    flexWrap: { xs: "wrap", mobile: "nowrap" },
    gap: 2,
    alignItems: "center",
  },

  avatar: {
    width: { xs: 60, mobile: 80 },
    height: 60,
    borderRadius: 1,
    "& img": {
      objectFit: "cover",
    },
  },
  quantityField: {
    width: 60,
    flexShrink: 0,
    ml: "auto",
  },
  infoBox: {
    order: { xs: 3, mobile: 0 },
    flexBasis: { xs: "100%", mobile: "auto" },
    flexGrow: 1,
    minWidth: 0,
  },

  deleteButton: {
    flexShrink: 0,
  },

  footer: {
    mt: 3,
    pt: 2,
    borderTop: "1px solid #eee",
    display: "flex",
    // На мобільці (xs) — стовпчик, на планшеті/десктопі (mobile) — рядок
    flexDirection: { xs: "column", mobile: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2, // Це автоматично додасть відступ і між ціною, і кнопкою
  },

  submitButton: {
    fontWeight: "bold",
    px: 4,
    py: 1.5,
    // На мобільці кнопка на всю ширину, на десктопі — звичайна
    width: { xs: "100%", mobile: "auto" },
    // Якщо gap чомусь не спрацює в старих браузерах, mt як страховка:
    mt: { xs: 1, mobile: 0 },
    borderRadius: "50px",
  },

  totalText: {
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
};
