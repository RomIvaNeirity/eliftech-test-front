"use client";
import { Container, Grid, Box, Button } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { changeQuantity, clearCart } from "@/store/cartSlice";
import { useCreateOrderMutation } from "@/store/api";
import { Header } from "@/components/Header/Header";
import { CartItemList } from "@/components/CarItemList/CartItemList";
import { CartForm } from "@/components/CartForm/CartForm";
import { cartStyles as s } from "./page.styles";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleOrderSubmit = async () => {
    try {
      await createOrder({
        ...formData,
        totalPrice,
        items: cartItems.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
        })),
      }).unwrap();
      alert("Success!");
      dispatch(clearCart());
      window.location.href = "/";
    } catch {
      alert("Error!");
    }
  };

  const router = useRouter();

  return (
    <>
      <Header />
      <Container maxWidth="desktop" sx={s.container}>
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{ bgcolor: "#2c3e50", mb: 2 }}
        >
          ← Continue Shopping
        </Button>
        <Grid container spacing={3} sx={s.gridContainer}>
          {/* Форма замовлення - зліва */}
          <Grid size={{ xs: 12, tablet: 4 }}>
            <Box sx={s.formWrapper}>
              <CartForm formData={formData} onChange={setFormData} />
            </Box>
          </Grid>

          {/* Список товарів - справа */}
          <Grid size={{ xs: 12, tablet: 8 }}>
            <Box sx={s.listWrapper}>
              <CartItemList
                items={cartItems}
                onQtyChange={(id, delta) =>
                  dispatch(changeQuantity({ id, delta }))
                }
                onRemove={(id) => dispatch(changeQuantity({ id, delta: -999 }))}
                total={totalPrice}
                isValid={
                  !!(
                    formData.name &&
                    formData.email &&
                    formData.phone &&
                    formData.address &&
                    cartItems.length
                  )
                }
                onSubmit={handleOrderSubmit}
                isSubmitting={isLoading}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
