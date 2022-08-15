import React from 'react';
import PropTypes from 'prop-types';

PostList.propTypes = {
    postList: PropTypes.array,
};

function PostList({postList = []}) {
    return (
       <ul>
        {postList.map(post=>(
            <li key={post.id}>{post.title}</li>
        ))}
       </ul>
    );
}

export default PostList;