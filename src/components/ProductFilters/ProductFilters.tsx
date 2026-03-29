import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
} from "@mui/material";

// Варіанти сортування
export const SORT_OPTIONS = {
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc",
  NAME_AZ: "name_az",
  DEFAULT: "default",
};

interface Props {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ProductFilters = ({
  categories,
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortChange,
}: Props) => {
  const handleCatChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    onCategoryChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Фільтр категорій */}
      <FormControl sx={{ minWidth: 250, flexGrow: 1 }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={handleCatChange}
          input={<OutlinedInput label="Filter by Category" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Сортування */}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          label="Sort by"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <MenuItem value={SORT_OPTIONS.DEFAULT}>None</MenuItem>
          <MenuItem value={SORT_OPTIONS.PRICE_ASC}>Price: Low to High</MenuItem>
          <MenuItem value={SORT_OPTIONS.PRICE_DESC}>
            Price: High to Low
          </MenuItem>
          <MenuItem value={SORT_OPTIONS.NAME_AZ}>Name: A → Z</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
