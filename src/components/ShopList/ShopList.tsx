"use client";

import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ShopFilters } from "../ShopFilters/ShopFilters";
import { useAppSelector } from "@/store/hooks";
import { shopListStyles as s } from "./ShopList.styles";
import { Shop } from "@/types/types";

interface ShopListProps {
  shops: Shop[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  ratingFilter: string;
  onRatingChange: (value: string) => void;
}

export const ShopList = ({
  shops,
  selectedId,
  onSelect,
  ratingFilter,
  onRatingChange,
}: ShopListProps) => {
  const cartShopId = useAppSelector((state) => state.cart.shopId);
  const isCartNotEmpty = useAppSelector((state) => state.cart.items.length > 0);

  return (
    <Paper elevation={3} sx={s.paper}>
      <Box sx={s.controlsStack}>
        <Box sx={s.filtersWrapper}>
          <ShopFilters value={ratingFilter} onChange={onRatingChange} />
        </Box>

        {/* Shop Select: only on mobile */}
        <FormControl fullWidth size="small" sx={s.mobileSelect}>
          <InputLabel>Select Shop</InputLabel>
          <Select
            value={selectedId || ""}
            label="Select Shop"
            onChange={(e) => onSelect(Number(e.target.value))}
          >
            {shops.map((shop) => (
              <MenuItem key={shop.id} value={shop.id}>
                {shop.name} {shop.rating}★{" "}
                {Number(cartShopId) === shop.id ? "🛒" : ""}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2, display: { xs: "none", tablet: "block" } }} />

      {/* Desktop List: from 768px (tablet) */}
      <Box sx={s.desktopList}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Shops:
        </Typography>
        <List>
          {shops.map((shop) => {
            const isSelected = selectedId === shop.id;
            const isCartShop = isCartNotEmpty && Number(cartShopId) === shop.id;

            return (
              <ListItemButton
                key={shop.id}
                selected={isSelected}
                onClick={() => onSelect(shop.id)}
                sx={s.listItem(isSelected, isCartShop)}
              >
                <ListItemText
                  primary={shop.name}
                  secondary={`Rating: ${shop.rating} ★`}
                />
                {isCartShop && (
                  <Box component="span" sx={s.cartIcon}>
                    🛒
                  </Box>
                )}
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};
