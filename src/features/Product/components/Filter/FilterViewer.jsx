import { Box, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { changeNumToPrice } from "utils";

const useStyles = makeStyles({
  listView: {
    listStyle: "none",
    paddingLeft: "0",
    margin: "0 0 20px 0",
    display: "flex",
    flexWrap: "wrap",
    "& > li": {
      marginRight: "15px",
    },
  },
});
FilterViewer.propTypes = {
  filter: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filter, onChange = null }) {
  const classes = useStyles();
  const categories = useSelector((state) => state.category);
  const listFilter = [
    {
      id: 1,
      label: () => "Miễn phí giao hàng",
      available: () => true,
      clickable: true,
      active: (filter) => filter.isFreeShip,
      iconRemove: false,
      click: (filter) => {
        const newFilter = {
          ...filter,
        };
        newFilter.isFreeShip = !filter.isFreeShip;
        if (onChange) {
          onChange(newFilter);
        }
      },
      delete: () => {},
    },
    {
      id: 2,
      label: () => "Có khuyến mãi",
      available: (filter) => filter.isPromotion,
      clickable: false,
      active: () => true,
      iconRemove: true,
      click: null,
      delete: (filter) => {
        const newFilter = {
          ...filter,
        };
        delete newFilter.isPromotion;
        if (onChange) {
          onChange(newFilter);
        }
      },
    },
    {
      id: 3,
      label: (filter) => `Từ ${changeNumToPrice(filter.salePrice_gte)}đ đến ${changeNumToPrice(filter.salePrice_lte)}đ`,
      available: (filter) => filter.salePrice_lte > filter.salePrice_gte,
      clickable: false,
      active: () => true,
      iconRemove: true,
      click: null,
      delete: (filter) => {
        const newFilter = {
          ...filter,
        };
        delete newFilter.salePrice_lte;
        delete newFilter.salePrice_gte;
        if (onChange) {
          onChange(newFilter);
        }
      },
    },
    {
      id: 4,
      label: (filter) => {
        const x = categories.find((item) => item.id === Number(filter["category.id"]));
        return x.name;
      },
      available: (filter) => !!filter["category.id"],
      clickable: false,
      active: () => true,
      iconRemove: true,
      click: null,
      delete: (filter) => {
        const newFilter = {
          ...filter,
        };
        delete newFilter["category.id"];
        if (onChange) {
          onChange(newFilter);
        }
      },
    },
  ];

  return (
    <Box component="ul" className={classes.listView}>
      {listFilter
        .filter((x) => x.available(filter) === true)
        .map((item) => (
          <li key={item.id}>
            <Chip
              label={item.label(filter)}
              color={item.active(filter) ? "primary" : "default"}
              onClick={item.clickable ? () => item.click(filter) : null}
              onDelete={item.iconRemove ? () => item.delete(filter) : null}
              clickable={item.clickable}
            />
          </li>
        ))}
    </Box>
  );
}

export default FilterViewer;
