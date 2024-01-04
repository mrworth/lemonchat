import React from 'react';
import Post from './Post';

const PostList = (props) => {
  const replies = props.replies;
  return (
      <div className="reply-container">
        {Object.values(replies).map((reply) => (
          <div className="content-row" key={reply.id}>
            <Post key={reply.id} parentId={props.parentId} {...reply}/>
          </div>
        ))}
      </div>
  );
};

export default PostList;
