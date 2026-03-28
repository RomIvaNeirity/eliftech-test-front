import { SxProps, Theme } from "@mui/material";

export const headerStyles = {
  // Копія sx={{ mb: 4, bgcolor: "#2c3e50" }}
  appBar: {
    mb: 4,
    bgcolor: "#2c3e50",
  },
  // Копія sx={{ flexGrow: 1 }}
  logo: {
    flexGrow: 1,
  },

  toolbar: {
    display: "flex",
    // До 425px — стовпчик, після 425px — рядок
    flexDirection: { xs: "column", mobile: "row" },

    // Падінги змінюються на твоїх точках
    padding: {
      xs: "8px", // 0 - 424px
      mobile: "16px", // 425 - 767px
      tablet: "24px", // 768 - 1439px
      desktop: "32px", // 1440px+
    },
  },
  // Копія твоєї функції getStyle
  getNavLink: (isActive: boolean): SxProps<Theme> => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "#ffeb3b" : "white",
    borderBottom: isActive ? "2px solid #ffeb3b" : "none",
    borderRadius: 0,
    mx: 1,
  }),
};
