import React from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object,
  onClickNav: PropTypes.func,
};

function Pagination({ pagination = {}, onClickNav = null }) {
  const { _limit, _page, _totalRows } = pagination;
  const lastPage = Math.ceil(_totalRows / _limit);
  const handleClickNav = (page) => {
    if (onClickNav) {
      onClickNav(page);
    }
  };
  return (
    <div>
      <button disabled={_page === 1} onClick={()=>handleClickNav(_page - 1)}>prev</button>
      <button disabled={_page === lastPage} onClick={()=>handleClickNav(_page + 1)}>next</button>
    </div>
  );
}

export default Pagination;
