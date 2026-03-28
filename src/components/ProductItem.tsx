import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { RootState } from "@/store/store";

export const ProductItem = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        position: "relative",
        transition: "0.2s",
        "&:hover": { boxShadow: isInCart ? 1 : 4 },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="160"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: "cover",
            filter: isInCart ? "grayscale(30%)" : "none",
            opacity: isInCart ? 0.8 : 1,
          }}
        />
        {isInCart && (
          <Badge
            color="success"
            badgeContent={<ShoppingCartIcon sx={{ fontSize: 14 }} />}
            sx={{ position: "absolute", top: 20, right: 25 }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", mb: 0.5 }}
        >
          {product.category || "General"}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            lineHeight: 1.2,
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2, // Максимум 2 рядки
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.4em",
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontWeight: "bold", mb: 1.5 }}
        >
          {product.price} ₴
        </Typography>

        <Box>
          <Button
            variant={isInCart ? "outlined" : "contained"}
            fullWidth
            onClick={() => dispatch(addToCart(product))}
            disabled={isInCart}
            color="success"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              "&.Mui-disabled": {
                backgroundColor: "#2e7d32", // success.main
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 0.6,
              },
            }}
          >
            {isInCart ? "Added to Cart ✓" : "Add to Cart"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
