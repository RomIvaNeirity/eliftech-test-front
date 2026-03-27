import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const getStyle = (path: string) => ({
    fontWeight: pathname === path ? "bold" : "normal",
    color: pathname === path ? "#ffeb3b" : "white",
    borderBottom: pathname === path ? "2px solid #ffeb3b" : "none",
    borderRadius: 0,
    mx: 1,
  });

  return (
    <AppBar position="static" sx={{ mb: 4, bgcolor: "#2c3e50" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            DELIVERY
          </Typography>

          <Button sx={getStyle("/")} component={Link} href="/">
            Shop
          </Button>
          <Button sx={getStyle("/cart")} component={Link} href="/cart">
            Cart
          </Button>
          <Button sx={getStyle("/history")} component={Link} href="/history">
            History
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
