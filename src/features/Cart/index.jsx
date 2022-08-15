import { Box, Button, FormControl, IconButton, OutlinedInput, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { changeNumToPrice, getThumbnail } from "utils";
import { cartTotalSelector } from "./cartSelector";
import { removeItem, setQuantity } from "./cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const useStyles = makeStyles({
  link: {
    color: "white",
  },
  cart: {
    padding: "12px",
  },
  list: {
    listStyle: "none",
    paddingLeft: "0",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "15px 0",
  },
  image: {
    width: "150px",
  },
  mid: {
    width: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  right: {
    width: "100px",
    textAlign: "right",
  },
  salePrice: {},
  originalPrice: {},
  quantity: {},
  total: {},
  delete: {},
  totalAll: {
    textAlign: "center",
    backgroundColor: "beige",
  },
  btn_cart: {
    width: "100%",
  },
});
CartFeature.propTypes = {};

function CartFeature(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartList = useSelector((state) => state.cart).cartList;
  const totalPriceCart = useSelector(cartTotalSelector);
  const handleClickDelete = (productId) => {
    const action = removeItem(productId);
    dispatch(action);
  };
  return (
    <Box className={classes.cart}>
      <Box className={classes.list} component="ul">
        {cartList.map((item) => (
          <li key={item.id}>
            <Box className={classes.item}>
              <img className={classes.image} src={getThumbnail(item.product.thumbnail)} alt={item.product.name} />
              <Box className={classes.mid}>
                <Box>
                  <Typography className={classes.salePrice}>{changeNumToPrice(item.product.salePrice)}</Typography>
                  {item.product.isPromotion && (
                    <Typography className={classes.originalPrice}>
                      {changeNumToPrice(item.product.originalPrice)}
                    </Typography>
                  )}
                </Box>
                <Typography className={classes.quantity}>{`X ${item.quantity}`}</Typography>
              </Box>
              <Box>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <IconButton
                    onClick={() => {
                      const action = setQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      });

                      dispatch(action);
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <OutlinedInput value={item.quantity} />
                  <IconButton
                    onClick={() => {
                      const action = setQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      });
                      dispatch(action);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </FormControl>
              </Box>
              <Box className={classes.right}>
                <Typography className={classes.total}>
                  {`${changeNumToPrice(item.quantity * item.product.salePrice)} đ`}
                </Typography>
                <button onClick={() => handleClickDelete(item.id)} className={classes.delete}>
                  Delete
                </button>
              </Box>
            </Box>
          </li>
        ))}
      </Box>
      <Typography className={classes.totalAll}>{`Tổng: ${
        changeNumToPrice(totalPriceCart) ? changeNumToPrice(totalPriceCart) : 0
      } đ`}</Typography>
      <Button className={classes.btn_cart}>Thanh toán ngay</Button>
    </Box>
  );
}

export default CartFeature;
