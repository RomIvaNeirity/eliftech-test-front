import {
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Box, // Додано
  Divider, // Додано
} from "@mui/material";
import { Shop } from "@/types/types";
import { ShopFilters } from "./ShopFilters/ShopFilters";

interface ShopListProps {
  shops: Shop[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  // ДОДАНО НОВІ ПРОПСИ:
  ratingFilter: string;
  onRatingChange: (value: string) => void;
}

export const ShopList = ({
  shops,
  selectedId,
  onSelect,
  ratingFilter,
  onRatingChange,
}: ShopListProps) => (
  <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
    <Box>
      {/* Тепер ці змінні доступні, бо ми їх витягли з пропсів вище */}
      <ShopFilters value={ratingFilter} onChange={onRatingChange} />

      <Divider sx={{ mb: 2 }} />

      <Typography
        variant="h6"
        gutterBottom
        align="left"
        sx={{ fontWeight: "bold", px: 1 }}
      >
        Shops:
      </Typography>

      <List>
        {shops.map((shop) => (
          <ListItemButton
            key={shop.id}
            selected={selectedId === shop.id}
            onClick={() => onSelect(shop.id)}
            sx={{
              mb: 1,
              borderRadius: 1,
              border: "1px solid #eee",
              "&.Mui-selected": {
                backgroundColor: "rgba(46, 125, 50, 0.08)", // Світло-зелений при виборі
                borderColor: "success.main",
              },
            }}
          >
            <ListItemText
              primary={shop.name}
              secondary={`Rating: ${shop.rating} ★`} // Додав відображення рейтингу для наочності
            />
          </ListItemButton>
        ))}

        {shops.length === 0 && (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ py: 2 }}
          >
            No shops found
          </Typography>
        )}
      </List>
    </Box>
  </Paper>
);
