import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles =  makeStyles({
    item: {
        padding: "12px"
    }
})
ListProductSkeleton.propTypes = {
};

function ListProductSkeleton({total}) {
    const classes = useStyles()
    return (
        <Grid container>
        {Array.from(new Array(12)).map((product, inx) => (
          <Grid xs={4} item key={inx}>
            <Box className={classes.item}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
}

export default ListProductSkeleton;