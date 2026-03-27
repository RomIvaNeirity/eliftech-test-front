"use client";

import React, { useState } from "react";
import {
  Container,
  Grid, // Імпортуємо Grid2 для підтримки пропса size
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
import { Header } from "@/components/Header";
import { useLazyGetOrderHistoryQuery } from "@/store/api";
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

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Order History
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Find my orders
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
              >
                <TextField
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Phone"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            {orders && orders.length > 0 ? (
              orders.map((order: Order) => (
                <Accordion
                  key={order.id}
                  sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        pr: 2,
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Order created
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        sx={{ fontWeight: "bold" }}
                      >
                        {order.totalPrice} ₴
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      {order.items.map((item: OrderItem) => (
                        <Grid
                          key={item.id}
                          size={{ xs: 12 }} // Виправили тут: прибрали item, додали size
                          sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            src={item.product?.image}
                            alt={item.product?.name}
                            sx={{
                              width: 70,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
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
              <Box
                sx={{
                  p: 5,
                  textAlign: "center",
                  border: "2px dashed #ccc",
                  borderRadius: 4,
                }}
              >
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
