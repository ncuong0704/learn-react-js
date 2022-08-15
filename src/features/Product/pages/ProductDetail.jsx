import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import productApi from "api/productApi";
import QuantityField from "components/form-controls/quantityField";
import StorageKeys from "constants/storage-keys";
import { addCart } from "features/Cart/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { changeNumToPrice, getThumbnail } from "utils";

const useStyles = makeStyles({
  root: {
    marginTop: "30px",
  },
  left: {
    padding: "12px",
    borderRight: "1px solid rgb(0 0 0 / 14%)",
  },
  right: {
    padding: "12px",
  },
  image: {
    width: "100%",
  },
  name: {},
  shortDescription: {
    margin: "8px 0 !important",
  },
  blockPrice: {
    display: "flex",
    alignItems: "center",
  },
  salePrice: {},
  originalPrice: {
    marginLeft: "12px !important",
    fontSize: "18px !important",
    textDecoration: "line-through",
  },
  promotionPercent: {
    marginLeft: "12px !important",
    fontSize: "12px !important",
    color: "red",
  },
  tabs: {
    listStyle: "none",
    paddingLeft: "0",
    display: "flex",
    justifyContent: "space-evenly",
  },
  tab: {
    "& a": {
      textDecoration: "none",
      color: "black",
      fontWeight: "bold",
    },
    "& .active": {
      color: "blue",
    },
  },
});

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const availableUser = !!useSelector((state) => state.user).current.id;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    (async () => {
      const product = await productApi.get(productId);
      setProduct(product);
    })();
  }, [productId]);

  const [quantity, setQuantity] = useState(1);
  const handleChangeQuantity = (value) => {
    setQuantity(value);
  };
  const handleAddCart = () => {
    if (availableUser) {
      const action = addCart({
        id: productId,
        product,
        quantity,
      });
      dispatch(action);
    } else {
      alert("Vui lòng đăng nhập");
    }
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Paper>
          <Grid container>
            <Grid item xs={5} className={classes.left}>
              <img className={classes.image} src={getThumbnail(product.thumbnail)} alt={product.name} />
            </Grid>
            <Grid item xs={7} className={classes.right}>
              <Box>
                <Typography className={classes.name} variant="h4">
                  {product.name}
                </Typography>
                <Typography className={classes.shortDescription} variant="body2">
                  {product.shortDescription}
                </Typography>
                <Box className={classes.blockPrice}>
                  <Typography className={classes.salePrice} variant="h5">{`${changeNumToPrice(
                    product.salePrice
                  )} đ`}</Typography>
                  {product.isPromotion && (
                    <>
                      <Typography className={classes.originalPrice}>{`${changeNumToPrice(
                        product.originalPrice
                      )} đ`}</Typography>
                      <Typography className={classes.promotionPercent}>{`-${product.promotionPercent}%`}</Typography>
                    </>
                  )}
                </Box>
                <Typography>Quantity:</Typography>
                <QuantityField onChange={handleChangeQuantity} />
                <Button onClick={handleAddCart}>Add Cart</Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Box>
          <Box component="ul" className={classes.tabs}>
            <li className={classes.tab}>
              <NavLink to="" end>Description</NavLink>
            </li>
            <li className={classes.tab}>
              <NavLink to="additional">Additional infomation</NavLink>
            </li>
            <li className={classes.tab}>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </Box>
          <Outlet context={product.description} />
        </Box>
      </Container>
    </Box>
  );
}

export default ProductDetail;
