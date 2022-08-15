import React from "react";
import PropTypes from "prop-types";
import FilterByCategory from "./FilterByCategory";
import FilterByRangePrice from "./FilterByRangePrice";
import FilterByService from "./FilterByService";

FilterProduct.propTypes = {
  onChangeFilter: PropTypes.func,
  filter: PropTypes.object,
};

function FilterProduct({ onChangeFilter = null, filter = {} }) {
  const handleChangeCategry = (values) => {
    const option = {
      "category.id": values,
    };
    if (onChangeFilter) {
      onChangeFilter(option);
    }
  };
  const handleChangeRangePrice = (values) => {
    if (onChangeFilter) {
      onChangeFilter(values);
    }
  };
  const handleChangeService = (values) => {
    if (onChangeFilter) {
      onChangeFilter(values);
    }
  };
  return (
    <div>
      <FilterByCategory onChange={handleChangeCategry} />
      <FilterByRangePrice onChange={handleChangeRangePrice} />
      <FilterByService filter={filter} onChange={handleChangeService} />
    </div>
  );
}

export default FilterProduct;
