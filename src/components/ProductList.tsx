// src/components/ProductList.tsx
import { Grid, Typography, Paper } from "@mui/material";
import { Product } from "@/types/types";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
  products: Product[] | undefined;
  isLoading: boolean;
}

export const ProductList = ({ products, isLoading }: ProductListProps) => (
  <Paper elevation={3} sx={{ p: 3, minHeight: "70vh", bgcolor: "#fafafa" }}>
    {isLoading ? (
      <Typography>Loading products...</Typography>
    ) : (
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid size={{ xs: 12, md: 4, lg: 4 }} key={product.id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    )}
  </Paper>
);
