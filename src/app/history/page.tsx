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
import { historyStyles as s } from "./page.styles"; // Імпортуємо стилі
import type { Order, OrderItem } from "@/types/types";

export default function HistoryPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trigger, { data: orders, isLoading }] = useLazyGetOrderHistoryQuery();

  const handleSearch = () => {
    if (email && phone) {
      trigger({ email, phone });
    } else {
      alert("Будь ласка, введіть Email та Телефон");
    }
  };

  return (
    <>
      <Header />

      <Container maxWidth="desktop" sx={s.container}>
        <Typography variant="h5" sx={s.pageTitle}>
          Order History
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, tablet: 4 }}>
            <Paper elevation={3} sx={s.searchPaper}>
              <Typography variant="h6">Find my orders</Typography>
              <Box sx={s.searchBox}>
                <TextField
                  label="Email"
                  required={true}
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Phone"
                  required={true}
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
            {orders && orders.length > 0 ? (
              orders.map((order: Order) => (
                <Accordion key={order.id} sx={s.accordion}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={s.accordionSummary}>
                      <Box>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Order created
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={s.orderTotal}>
                        {order.totalPrice} ₴
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
