import React from 'react';

const Post = (props) => {

  return (
    <div className="content-message">
        <div className="message-topbar">➕ ➖ 🍋</div>
        {props.content}
    </div>
  );
};

export default Post;
