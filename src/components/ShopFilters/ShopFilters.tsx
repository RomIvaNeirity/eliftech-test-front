import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ShopFilters = ({ value, onChange }: Props) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <StarIcon sx={{ color: "#faaf00" }} /> Shop Rating
      </Typography>

      <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
        <FormControlLabel
          value="all"
          control={<Radio size="small" color="success" />}
          label="All Shops"
        />
        <FormControlLabel
          value="4-5"
          control={<Radio size="small" color="success" />}
          label="4.0 — 5.0 ★"
        />
        <FormControlLabel
          value="3-4"
          control={<Radio size="small" color="success" />}
          label="3.0 — 4.0 ★"
        />
        <FormControlLabel
          value="0-3"
          control={<Radio size="small" color="success" />}
          label="Below 3.0 ★"
        />
      </RadioGroup>
    </Box>
  );
};
