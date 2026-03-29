"use client";

import { Container, Grid, CircularProgress, Box } from "@mui/material";
import { useState, useMemo } from "react";
import { useGetShopsQuery, useGetProductsByShopQuery } from "@/store/api";
import { Header } from "@/components/Header/Header";
import { ShopList } from "@/components/ShopList";
import { ProductList } from "@/components/ProductList";
import { ProductFilters } from "@/components/ProductFilters/ProductFilters";
import { homeStyles as s } from "./page.styles";

export default function HomePage() {
  const { data: shops, isLoading: shopsLoading } = useGetShopsQuery();
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  const currentShopId = selectedShopId || (shops?.length ? shops[0].id : null);

  const { data: products, isLoading: productsLoading } =
    useGetProductsByShopQuery(currentShopId ?? 0, { skip: !currentShopId });

  const handleShopSelect = (id: number) => {
    setSelectedShopId(id);
    setSelectedCats([]); // Скидаємо категорії одразу при кліку
    setSortBy("default"); // Скидаємо сортування
  };

  const filteredShops = useMemo(() => {
    if (!shops) return [];
    if (ratingFilter === "all") return shops;

    const [min, max] = ratingFilter.split("-").map(Number);
    return shops.filter((shop) => shop.rating >= min && shop.rating <= max);
  }, [shops, ratingFilter]);

  const allCategories = useMemo(() => {
    if (!products) return [];
    return Array.from(
      new Set(products.map((p) => p.category).filter(Boolean)),
    ) as string[];
  }, [products]);

  // 4. ФІЛЬТРАЦІЯ ТА СОРТУВАННЯ
  const displayProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (selectedCats.length > 0) {
      result = result.filter((p) => selectedCats.includes(p.category));
    }

    result.sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "name_az") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [products, selectedCats, sortBy]);

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
      <Container maxWidth="desktop" sx={s.mainContainer}>
        <Grid container spacing={3} sx={s.gridContainer}>
          <Grid size={{ xs: 12, tablet: 3 }}>
            <Box sx={s.shopSection}>
              <ShopList
                shops={filteredShops}
                selectedId={currentShopId}
                onSelect={handleShopSelect}
                ratingFilter={ratingFilter}
                onRatingChange={setRatingFilter}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, tablet: 9 }}>
            <ProductFilters
              categories={allCategories}
              selectedCategories={selectedCats}
              onCategoryChange={setSelectedCats}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <ProductList
              products={displayProducts}
              isLoading={productsLoading}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
