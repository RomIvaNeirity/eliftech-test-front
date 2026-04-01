"use client";

import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Accordion,
  AccordionDetails,
  Divider,
  Avatar,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Header } from "@/components/Header/Header";
import { useLazyGetOrderHistoryQuery } from "@/store/api";
import { historyStyles as s } from "./page.styles";
import type { Order, OrderItem, CartItem } from "@/types/types";
import { useAppDispatch } from "@/store/hooks";
import { reorder } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [trigger, { data: orders, isLoading }] = useLazyGetOrderHistoryQuery();

  const handleSearch = () => {
    if (email && phone) {
      trigger({ email, phone });
    } else {
      alert("Enter Email and Phone to search for your orders.");
    }
  };

  const handleReorder = (order: Order) => {
    const items = order.items
      .map((i) => (i.product ? { ...i.product, quantity: i.quantity } : null))
      .filter((i): i is CartItem => i !== null);

    const targetShopId = order.shopId || order.items[0]?.product?.shopId;

    if (!targetShopId) {
      alert("Error: Shop information is missing for this order.");
      return;
    }

    dispatch(reorder({ items, shopId: Number(targetShopId) }));

    router.push("/cart");
  };

  return (
    <>
      <Header />
      <Container maxWidth="desktop" sx={s.container}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, tablet: 4 }}>
            <Paper elevation={3} sx={s.searchPaper}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Find my orders
              </Typography>
              <Box sx={s.searchBox}>
                <TextField
                  label="Email"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Phone"
                  required
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSearch}
                  disabled={isLoading}
                  sx={{ bgcolor: "#2c3e50" }}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, tablet: 8 }}>
            <Paper elevation={3} sx={s.searchPaper}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Order History
              </Typography>
              {orders && orders.length > 0 ? (
                orders.map((order: Order) => (
                  <Accordion key={order.id} sx={s.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={s.accordionSummary}>
                        <Box>
                          <Typography sx={{ fontWeight: "bold" }}>
                            Order #{order.id?.toString().slice(-5)}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Created at:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={s.orderTotal}>
                          Total: {order.totalPrice} ₴
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider sx={{ mb: 2 }} />
                      <Grid container spacing={2}>
                        {order.items.map((item: OrderItem) => (
                          <Grid key={item.id} size={{ xs: 12 }} sx={s.itemRow}>
                            <Avatar
                              src={item.product?.image}
                              alt={item.product?.name}
                              variant="rounded"
                              sx={s.productAvatar}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle2">
                                {item.product?.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {item.quantity} x {item.product?.price} ₴
                              </Typography>
                            </Box>
                            <Typography sx={{ fontWeight: "500" }}>
                              {item.quantity * (item.product?.price ?? 0)} ₴
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                      {/* Кнопка Reorder внизу деталей замовлення */}
                      <Box
                        sx={{
                          mt: 3,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          disabled={isLoading}
                          sx={{ bgcolor: "#2c3e50" }}
                          onClick={() => handleReorder(order)}
                        >
                          Reorder this
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : orders?.length === 0 ? (
                <Typography align="center" color="textSecondary" sx={{ mt: 5 }}>
                  No orders found for this contact information.
                </Typography>
              ) : (
                <Box sx={s.emptyState}>
                  <Typography color="textSecondary">
                    Enter your details to see your previous orders
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
