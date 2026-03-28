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
          // Використовуємо твої кастомні брейкпоїнти
          <Grid
            key={product.id}
            size={{
              xs: 12, // До 425px - один в ряд
              mobile: 6, // Від 425px - два в ряд (опціонально)
              tablet: 4, // Від 768px - два в ряд (коли з'являються шопи зліва)
              desktop: 4, // Від 1440px - три в ряд
            }}
          >
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    )}
  </Paper>
);
