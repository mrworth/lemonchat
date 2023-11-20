import React from 'react';

const Thread = (props) => {

  return (
    <div className="content-message">
        <div className="message-topbar"><div>{props.title}</div><div className="right-bar">➕ ➖ 🍋</div></div>
        {props.content}
    </div>
  );
};

export default Thread;
