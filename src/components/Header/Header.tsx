"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerStyles as s } from "./Header.styles";

export const Header = () => {
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={s.appBar}>
      <Container maxWidth="desktop">
        <Toolbar sx={s.toolbar}>
          <Typography variant="h6" sx={s.logo}>
            DELIVERY
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Button
              sx={s.getNavLink(pathname === "/")}
              component={Link}
              href="/"
            >
              Shop
            </Button>
            <Button
              sx={s.getNavLink(pathname === "/cart")}
              component={Link}
              href="/cart"
            >
              Cart
            </Button>
            <Button
              sx={s.getNavLink(pathname === "/history")}
              component={Link}
              href="/history"
            >
              History
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
