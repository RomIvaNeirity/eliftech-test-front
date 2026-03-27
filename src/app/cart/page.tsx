"use client";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { changeQuantity, clearCart } from "@/store/cartSlice";
import { useCreateOrderMutation } from "@/store/api";
import { Header } from "@/components/Header";
import { CartItemList } from "@/components/CartItemList";
import { CartForm } from "@/components/CartForm";

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
      window.location.href = "/"; // або router.push('/')
    } catch {
      alert("Error!");
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <CartForm formData={formData} onChange={setFormData} />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <CartItemList
              items={cartItems}
              onQtyChange={(id, delta) =>
                dispatch(changeQuantity({ id, delta }))
              }
              onRemove={(id) => dispatch(changeQuantity({ id, delta: -999 }))}
              total={totalPrice}
              isValid={!!(formData.name && formData.email && cartItems.length)}
              onSubmit={handleOrderSubmit}
              isSubmitting={isLoading}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
