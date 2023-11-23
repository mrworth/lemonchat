import React from 'react';
import Post from './Post';

const PostList = (props) => {
  const replies = props.replies;
  console.log(Object.values(replies)[0])
  return (
      <div className="reply-container">
        {Object.values(replies).map((reply) => (
          <div className="content-row" key={reply.id}>
            <Post key={reply.id} {...reply}/>
          </div>
        ))}
      </div>
  );
};

export default PostList;
