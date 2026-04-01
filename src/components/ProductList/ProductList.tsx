"use client";

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { Product } from "@/types/types";
import { ProductItem } from "../ProductItem/ProductItem";
import { productListStyles as s } from "./ProductList.styles";

interface ProductListProps {
  products: Product[] | undefined;
  isLoading: boolean;
}

export const ProductList = ({ products, isLoading }: ProductListProps) => (
  <Paper elevation={3} sx={s.container}>
    {isLoading ? (
      <Typography sx={s.loadingText}>Loading products...</Typography>
    ) : (
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid
            key={product.id}
            size={{
              xs: 12, // До 425px
              mobile: 6, // Від 425px
              tablet: 6, // Від 768px (два в ряд, бо зліва шопи)
              desktop: 4, // Від 1440px (три в ряд)
            }}
          >
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    )}
  </Paper>
);
