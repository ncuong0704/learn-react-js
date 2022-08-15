import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import StorageKeys from "constants/storage-keys";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { logOut } from "features/Auth/userSlice";
import { cartItensCountSelector, cartTotalSelector } from "features/Cart/cartSelector";
import { removeItem } from "features/Cart/cartSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { changeNumToPrice, getThumbnail } from "utils";
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
Header.propTypes = {};

function Header(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCart, setAnchorCart] = useState(null);
  const open = Boolean(anchorEl);
  const openCart = Boolean(anchorCart);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickCart = (event) => {
    setAnchorCart(event.currentTarget);
    console.log(1);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseCart = () => {
    setAnchorCart(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);

    const action = logOut();
    dispatch(action);
  };
  // dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSuccessRegister = () => {
    setIsRegister(true);
  };
  // user
  const [isRegister, setIsRegister] = useState(true);
  const availableUser = !!useSelector(state => state.user).current.id;
  // quantity cart
  const countQuantityCart = useSelector(cartItensCountSelector);
  const totalPriceCart = useSelector(cartTotalSelector);
  const cartList = useSelector((state) => state.cart).cartList;

  const handleClickDelete = (productId) => {
    const action = removeItem(productId);
    dispatch(action);
  };
  const handleToCart = () => {
    if(availableUser){
      navigate("cart");
      setAnchorCart(null);
    }else{
      alert("Vui lòng đăng nhập")
    }
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <NavLink className={classes.link} to="/">
                <AcUnitIcon />
              </NavLink>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React 1
            </Typography>
            <Button color="inherit">
              <NavLink className={classes.link} to="product">
                Product
              </NavLink>
            </Button>
            <Button color="inherit">
              <NavLink className={classes.link} to="">
                Album Mp3
              </NavLink>
            </Button>
            <Button color="inherit">
              <NavLink className={classes.link} to="todo">
                Todo
              </NavLink>
            </Button>
            <Button color="inherit">
              <NavLink className={classes.link} to="post">
                Post
              </NavLink>
            </Button>
            <Button color="inherit">
              <NavLink className={classes.link} to="add-and-delete">
                Add and delete Todo
              </NavLink>
            </Button>
            <Button color="inherit">
              <NavLink className={classes.link} to="count">
                Count
              </NavLink>
            </Button>
            <IconButton onClick={handleClickCart} size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={countQuantityCart} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {!isRegister && !availableUser && (
              <Button color="inherit">
                <span onClick={handleClickOpenDialog}>Register</span>
              </Button>
            )}
            {isRegister && !availableUser && (
              <Button color="inherit">
                <span onClick={handleClickOpenDialog}>Login</span>
              </Button>
            )}
            {availableUser && (
              <Button
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <AccountCircleIcon className={classes.link} />
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
        <Menu anchorEl={anchorCart} open={openCart} onClose={handleCloseCart}>
          <Box className={classes.cart}>
            <Box className={classes.list} component="ul">
              {cartList.map((item) => (
                <li key={item.id}>
                  <Box className={classes.item}>
                    <img className={classes.image} src={getThumbnail(item.product.thumbnail)} alt={item.product.name} />
                    <Box className={classes.mid}>
                      <Box>
                        <Typography className={classes.salePrice}>
                          {changeNumToPrice(item.product.salePrice)}
                        </Typography>
                        {item.product.isPromotion && (
                          <Typography className={classes.originalPrice}>
                            {changeNumToPrice(item.product.originalPrice)}
                          </Typography>
                        )}
                      </Box>
                      <Typography className={classes.quantity}>{`X ${item.quantity}`}</Typography>
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
            <Button onClick={handleToCart} className={classes.btn_cart}>
              Tới Giỏ Hàng
            </Button>
          </Box>
        </Menu>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {!isRegister && <Register handleSuccessRegister={handleSuccessRegister} />}
            {isRegister && <Login handleCloseDialog={handleCloseDialog} />}
          </DialogContent>
          {!isRegister && (
            <Typography onClick={() => setIsRegister(true)} textAlign="center">
              Đăng nhập
            </Typography>
          )}
          {isRegister && (
            <Typography onClick={() => setIsRegister(false)} textAlign="center">
              Bạn chưa có tài khoản?
            </Typography>
          )}

          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default Header;
