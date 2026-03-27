import {
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Shop } from "@/types/types";

interface ShopListProps {
  shops: Shop[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export const ShopList = ({ shops, selectedId, onSelect }: ShopListProps) => (
  <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
    <Typography variant="h6" gutterBottom align="center">
      Shops:
    </Typography>
    <List>
      {shops.map((shop) => (
        <ListItemButton
          key={shop.id}
          selected={selectedId === shop.id}
          onClick={() => onSelect(shop.id)}
          sx={{ mb: 1, borderRadius: 1, border: "1px solid #eee" }}
        >
          <ListItemText primary={shop.name} />
        </ListItemButton>
      ))}
    </List>
  </Paper>
);
