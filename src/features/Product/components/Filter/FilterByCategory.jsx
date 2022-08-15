import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoryApi from "api/categoryApi";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAll } from "./categorySlice";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange = null }) {
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const categories = await categoryApi.getAll();
      const action = getAll(categories);
      dispatch(action);
      setCategory(() =>
        categories.map((item) => ({
          id: item.id,
          name: item.name,
        }))
      );
    })();
  }, [dispatch]);
  const handleClickCategory = (id) => {
    if (onChange) {
      onChange(id);
    }
  };
  return (
    <Box>
      <Typography>Danh mục sản phẩm</Typography>
      <Box component="ul">
        {category.map((item) => (
          <li key={item.id} onClick={() => handleClickCategory(item.id)}>
            {item.name}
          </li>
        ))}
      </Box>
    </Box>
  );
}

export default FilterByCategory;
