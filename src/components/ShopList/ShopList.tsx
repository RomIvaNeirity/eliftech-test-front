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
} from "@mui/material";
import { Shop } from "@/types/types";
import { ShopFilters } from "../ShopFilters/ShopFilters";
import { useAppSelector } from "@/store/hooks";
import { shopListStyles as s } from "./ShopList.styles";

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
      <Box>
        <ShopFilters value={ratingFilter} onChange={onRatingChange} />

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" gutterBottom align="left" sx={s.title}>
          Shops:
        </Typography>

        <List>
          {shops.map((shop) => {
            const isSelected = selectedId === shop.id;
            // Перевіряємо, чи є в кошику товари саме цього магазину
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

                {/* Зелений візок, якщо магазин в кошику */}
                {isCartShop && (
                  <Box component="span" sx={s.cartIcon}>
                    🛒
                  </Box>
                )}
              </ListItemButton>
            );
          })}

          {shops.length === 0 && (
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={s.noShops}
            >
              No shops found
            </Typography>
          )}
        </List>
      </Box>
    </Paper>
  );
};
