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
  <Paper elevation={3} sx={{ p: 3, borderRadius: 2, minHeight: "500px" }}>
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
            <Card
              key={item.id}
              variant="outlined"
              sx={{
                mb: 2,
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Avatar
                src={item.image}
                alt={item.name}
                style={{ width: 80, height: 60, objectFit: "cover" }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">{item.name}</Typography>
                <Typography variant="body2" color="primary">
                  {item.price} ₴
                </Typography>
              </Box>
              <TextField
                type="number"
                size="small"
                sx={{ width: 60 }}
                value={item.quantity}
                onChange={(e) =>
                  onQtyChange(item.id, Number(e.target.value) - item.quantity)
                }
              />
              <IconButton color="error" onClick={() => onRemove(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </Box>
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Total: {total} ₴</Typography>
          <Button
            variant="contained"
            color="success"
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
