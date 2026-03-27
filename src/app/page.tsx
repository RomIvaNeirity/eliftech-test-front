"use client";

import { Container, Grid, CircularProgress, Box } from "@mui/material";
import { useState } from "react";
import { useGetShopsQuery, useGetProductsByShopQuery } from "@/store/api";
import { Header } from "@/components/Header";
import { ShopList } from "@/components/ShopList";
import { ProductList } from "@/components/ProductList";

export default function HomePage() {
  // Отримуємо дані магазинів
  const { data: shops, isLoading: shopsLoading } = useGetShopsQuery();
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  // ЗАМІСТЬ useEffect: використовуємо перший ID з масиву, якщо selectedShopId ще не встановлено
  const currentShopId = selectedShopId || (shops?.length ? shops[0].id : null);

  // Отримуємо продукти для вибраного (або першого за замовчуванням) магазину
  const { data: products, isLoading: productsLoading } =
    useGetProductsByShopQuery(currentShopId ?? 0, { skip: !currentShopId });

  // Використовуємо shopsLoading, щоб прибрати помилку (6133)
  if (shopsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <ShopList
              shops={shops || []}
              selectedId={currentShopId} // Передаємо актуальний ID
              onSelect={setSelectedShopId}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <ProductList products={products} isLoading={productsLoading} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
