import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filter: PropTypes.object,
};

function FilterByService({ onChange = null, filter = {} }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={filter.isFreeShip}
            onChange={() => {
              if (onChange) {
                onChange({
                  isFreeShip: !filter.isFreeShip,
                });
              }
            }}
          />
        }
        label="Miễn phí giao hàng"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filter.isPromotion}
            onChange={() => {
              if (onChange) {
                onChange({
                  isPromotion: !filter.isPromotion,
                });
              }
            }}
          />
        }
        label="Có khuyến mãi"
      />
    </FormGroup>
  );
}

export default FilterByService;
