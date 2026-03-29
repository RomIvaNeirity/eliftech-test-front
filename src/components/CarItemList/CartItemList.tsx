import {
  Paper,
  Typography,
  Box,
  Card,
  TextField,
  IconButton,
  Button,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { cartItemStyles as s } from "./CartItemList.styles";
import { Product } from "@/types/types";

interface CartItem extends Product {
  quantity: number;
}
interface Props {
  items: CartItem[];
  onQtyChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  total: number;
  isValid: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const CartItemList = ({
  items,
  onQtyChange,
  onRemove,
  total,
  isValid,
  onSubmit,
  isSubmitting,
}: Props) => (
  <Paper elevation={3} sx={s.paper}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
      Your Order
    </Typography>
    {items.length === 0 ? (
      <Typography color="textSecondary" align="center" sx={{ mt: 4 }}>
        Cart is empty
      </Typography>
    ) : (
      <>
        <Box sx={{ mt: 2, maxHeight: "60vh", overflowY: "auto", pr: 1 }}>
          {items.map((item) => (
            <Card key={item.id} variant="outlined" sx={s.card}>
              <Avatar
                src={item.image}
                alt={item.name}
                variant="rounded"
                sx={s.avatar}
              />

              <Box sx={s.infoBox}>
                <Typography variant="subtitle2" sx={s.productName}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="primary">
                  {item.price} ₴
                </Typography>
              </Box>

              <TextField
                type="number"
                size="small"
                sx={s.quantityField}
                value={item.quantity}
                onChange={(e) =>
                  onQtyChange(item.id, Number(e.target.value) - item.quantity)
                }
              />

              <IconButton
                color="error"
                onClick={() => onRemove(item.id)}
                sx={s.deleteButton}
              >
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Box>

        <Box sx={s.footer}>
          <Typography variant="h6" sx={s.totalText}>
            Total: {total} ₴
          </Typography>

          <Button
            variant="contained"
            color="success"
            sx={s.submitButton}
            disabled={!isValid || isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? "Sending..." : "Submit Order"}
          </Button>
        </Box>
      </>
    )}
  </Paper>
);
