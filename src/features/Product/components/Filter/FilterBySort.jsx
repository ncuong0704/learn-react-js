import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";

FilterBySort.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func,
};

function FilterBySort({ onChange = null, current }) {
  const handleChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box>
      <Tabs value={current} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Mới nhất" value="" />
        <Tab label="Từ thấp đến cao" value="salePrice:DESC" />
        <Tab label="Từ cao đến thấp" value="salePrice:ASC" />
      </Tabs>
    </Box>
  );
}

export default FilterBySort;
