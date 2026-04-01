"use client";

import React from "react";
import { Paper, Typography, Box, TextField } from "@mui/material";
import { CartFormData } from "@/types/types";
import { cartFormStyles as s } from "./CartForm.styles";

interface CartFormProps {
  formData: CartFormData;
  onChange: (data: CartFormData) => void;
}

export const CartForm = ({ formData, onChange }: CartFormProps) => (
  <Paper elevation={3} sx={s.paper}>
    <Typography variant="h6" gutterBottom sx={s.title}>
      Delivery Contacts
    </Typography>

    <Box sx={s.fieldsContainer}>
      <TextField
        label="Name"
        fullWidth
        required
        value={formData.name}
        onChange={(e) => onChange({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        value={formData.email}
        onChange={(e) => onChange({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Phone"
        fullWidth
        required
        value={formData.phone}
        onChange={(e) => onChange({ ...formData, phone: e.target.value })}
      />
      <TextField
        label="Address"
        fullWidth
        required
        multiline
        rows={3}
        value={formData.address}
        onChange={(e) => onChange({ ...formData, address: e.target.value })}
      />
    </Box>
  </Paper>
);
