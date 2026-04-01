"use client";

import React from "react";
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
import { productItemStyles as s } from "./ProductItem.styles";

export const ProductItem = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <Card sx={s.card(isInCart)}>
      <Box sx={s.mediaContainer}>
        <CardMedia
          component="img"
          height="160"
          image={product.image}
          alt={product.name}
          sx={s.media(isInCart)}
        />
        {isInCart && (
          <Badge
            color="success"
            badgeContent={<ShoppingCartIcon sx={{ fontSize: 14 }} />}
            sx={s.badge}
          />
        )}
      </Box>

      <CardContent sx={s.content}>
        <Typography variant="caption" color="text.secondary" sx={s.category}>
          {product.category || "General"}
        </Typography>

        <Typography variant="h6" sx={s.title}>
          {product.name}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="h6" color="primary.main" sx={s.price}>
          {product.price} ₴
        </Typography>

        <Box>
          <Button
            variant={isInCart ? "outlined" : "contained"}
            fullWidth
            onClick={() => dispatch(addToCart(product))}
            disabled={isInCart}
            color="success"
            sx={s.button(isInCart)}
          >
            {isInCart ? "Added to Cart ✓" : "Add to Cart"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
