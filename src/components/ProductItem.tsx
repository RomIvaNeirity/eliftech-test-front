import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Product } from "@/types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

export const ProductItem = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.price} ₴
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
