import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from "query-string";
import SearchPost from "./components/SearchPost";

PostFeature.propTypes = {};

function PostFeature(props) {
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _limit: 10,
    _page: 1,
  });
  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });
  useEffect(() => {
    (async () => {
      const param = queryString.stringify(filter);
      const request = await fetch(`http://js-post-api.herokuapp.com/api/posts?${param}`);
      const response = await request.json();
      const { data, pagination } = response;
      setPostList(data);
      setPagination(pagination);
    })();
  }, [filter]);

  const handleClickNav = (page) => {
    const newPagination = {
      ...pagination,
      _page: page,
    };
    setPagination(newPagination);

    const newFilter = {
      ...filter,
      _page: page,
    };
    setFilter(newFilter);
  };

  const handleSubmitSearch = (values) => {
    const newFilter = {
      ...filter,
      title_like: values,
    };
    setFilter(newFilter);
  };
  return (
    <div>
      <SearchPost onSubmit={handleSubmitSearch} />
      <PostList postList={postList} />
      <Pagination pagination={pagination} onClickNav={handleClickNav} />
    </div>
  );
}

export default PostFeature;
