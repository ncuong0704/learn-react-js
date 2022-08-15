import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import NumberFormat from "react-number-format";

FilterByRangePrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByRangePrice({ onChange = null }) {
  const [rangePrice, setRangePrice] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handleClickChange = () => {
    if (onChange) {
      if (rangePrice.salePrice_lte > rangePrice.salePrice_gte) {
        onChange(rangePrice);

        setRangePrice({
          salePrice_gte: 0,
          salePrice_lte: 0,
        });
      }
    }
  };
  return (
    <Box>
      <Typography>Giá:</Typography>
      <Box>
        <NumberFormat
          value={rangePrice.salePrice_gte}
          thousandSeparator={"."}
          decimalSeparator={","}
          onValueChange={(values) => {
            const { formattedValue, value } = values;
            // formattedValue = $2,223
            // value ie, 2223
            setRangePrice({
              ...rangePrice,
              salePrice_gte: value,
            });
          }}
        />
        <span>-</span>
        <NumberFormat
          value={rangePrice.salePrice_lte}
          thousandSeparator={"."}
          decimalSeparator={","}
          onValueChange={(values) => {
            const { formattedValue, value } = values;
            // formattedValue = $2,223
            // value ie, 2223
            setRangePrice({
              ...rangePrice,
              salePrice_lte: value,
            });
          }}
        />
        <Button onClick={handleClickChange}>Áp dụng</Button>
      </Box>
    </Box>
  );
}

export default FilterByRangePrice;
