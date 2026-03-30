"use client";

import { Container, Grid, CircularProgress, Box } from "@mui/material";
import { useState, useMemo, useEffect, useRef } from "react";
import { useGetShopsQuery, useGetProductsByShopQuery } from "@/store/api";
import { Header } from "@/components/Header/Header";
import { ShopList } from "@/components/ShopList/ShopList";
import { ProductList } from "@/components/ProductList";
import { ProductFilters } from "@/components/ProductFilters/ProductFilters";
import { homeStyles as s } from "./page.styles";
import { useAppSelector } from "@/store/hooks";

export default function HomePage() {
  const { data: shops, isLoading: shopsLoading } = useGetShopsQuery();

  const [visibleCount, setVisibleCount] = useState(8);
  const STEP = 6; // Скільки додаємо при кожному доскролі

  const observerTarget = useRef(null);

  // 1. Отримуємо дані з Redux
  const cartShopId = useAppSelector((state) => state.cart.shopId);

  // 2. Локальний стейт для ручного кліку
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  // 3. ОБЧИСЛЮЄМО ЄДИНИЙ ПРАВИЛЬНИЙ ID (Derived State)
  // Пріоритет: 1. Ручний вибір -> 2. Магазин з кошика -> 3. Перший магазин зі списку
  const activeShopId = useMemo(() => {
    if (selectedShopId) return selectedShopId;
    if (cartShopId) return Number(cartShopId);
    return shops?.length ? shops[0].id : null;
  }, [selectedShopId, cartShopId, shops]);

  // 4. Запит товарів тепер залежить від activeShopId
  const { data: products, isLoading: productsLoading } =
    useGetProductsByShopQuery(activeShopId ?? 0, { skip: !activeShopId });

  const handleShopSelect = (id: number) => {
    setSelectedShopId(id);
    setSelectedCats([]);
    setSortBy("default");
    setVisibleCount(STEP);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Коли бачимо низ — просто збільшуємо ліміт відображення
          setVisibleCount((prev) => prev + STEP);
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, []);

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
  const pagedProducts = useMemo(() => {
    return displayProducts.slice(0, visibleCount);
  }, [displayProducts, visibleCount]);

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
                selectedId={activeShopId}
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

            <ProductList products={pagedProducts} isLoading={productsLoading} />
            <Box
              ref={observerTarget}
              sx={{
                height: "50px",
                mt: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {displayProducts.length > visibleCount && (
                <CircularProgress size={20} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
