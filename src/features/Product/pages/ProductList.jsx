import { Box, Container, Grid, Pagination, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import productApi from "api/productApi";
import { STATIC_HOST, THUMNAIL_PLACEHOLDER } from "constants";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterBySort from "../components/Filter/FilterBySort";
import FilterProduct from "../components/Filter/FilterProduct";
import FilterViewer from "../components/Filter/FilterViewer";
import ListProductSkeleton from "../components/Skeleton/ListProductSkeleton";

const useStyles = makeStyles({
  root: {
    padding: "12px",
  },
  image: {
    width: "100%",
  },
  name: {
    fontSize: "18px !important",
    fontWeight: "bold !important",
  },
  price: {
    display: "flex !important",
    alignItems: "center !important",
  },
  salePrice: {
    fontSize: "18px !important",
    fontWeight: "bold !important",
  },
  promotionPercent: {
    fontSize: "12px !important",
    marginLeft: "20px !important",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
});

ProductList.propTypes = {};
const getThumbnail = (thumbnail) => {
  if (thumbnail) {
    return `${STATIC_HOST}${thumbnail.url}`;
  } else {
    return THUMNAIL_PLACEHOLDER;
  }
};
function ProductList(props) {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const urlParam = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: params._page || 1,
      _limit: params._limit || 12,
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data, pagination } = await productApi.getAll(urlParam);
      setProducts(data);
      setPagination(pagination);
      setLoading(false);
    })();
  }, [urlParam]);
  const handleClickPagination = (e, page) => {
    const filter = {
      ...urlParam,
      _page: page,
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handlefilterChange = (values) => {
    const filter = {
      ...urlParam,
      ...values,
    };
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filter),
    });
  };
  const handleFilterViewerChange = (values) => {
    const filter = values;
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleChangeSort = (values) => {
    if (values) {
      const newValues = {
        _sort: values,
      };
      const filter = {
        ...urlParam,
        ...newValues,
      };
      navigate({
        pathname: location.pathname,
        search: queryString.stringify(filter),
      });
    } else {
      const filter = {
        ...urlParam,
      };
      delete filter._sort;
      navigate({
        pathname: location.pathname,
        search: queryString.stringify(filter),
      });
    }
  };
  const handleClickProduct = (productId) => {
    navigate(`${productId}`)
  };
  return (
    <Box marginTop="30px">
      <Container>
        <Paper>
          <Grid container>
            <Grid sx={{ padding: "12px", borderRight: "1px solid rgb(0 0 0 / 14%)" }} xs={3} item>
              <FilterProduct filter={urlParam} onChangeFilter={handlefilterChange} />
            </Grid>
            <Grid sx={{ padding: "12px" }} xs={9} item>
              {loading && <ListProductSkeleton />}
              {!loading && (
                <Box>
                  <FilterViewer onChange={handleFilterViewerChange} filter={urlParam} />
                  <FilterBySort current={urlParam._sort || ""} onChange={handleChangeSort} />
                  <Grid container>
                    {products.map((product) => (
                      <Grid xs={4} item key={product.id}>
                        <Box className={classes.root} onClick={() => handleClickProduct(product.id)}>
                          <img className={classes.image} src={getThumbnail(product.thumbnail)} alt={product.name} />
                          <Typography className={classes.name}>{product.name}</Typography>
                          <Box className={classes.price}>
                            <Typography className={classes.salePrice}>{product.salePrice}</Typography>
                            {product.isPromotion && (
                              <Typography
                                className={classes.promotionPercent}
                              >{`-${product.promotionPercent}%`}</Typography>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              <Pagination
                className={classes.pagination}
                onChange={handleClickPagination}
                count={Math.ceil(pagination.total / pagination.limit ? pagination.total / pagination.limit : 10)}
                color="primary"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProductList;
