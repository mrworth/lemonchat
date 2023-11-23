import React from 'react';
import PostList from './PostList';
import { useSelector, useDispatch  } from 'react-redux';
import { focusPost, selectFocusedPosts } from '../slices/focusPostSlice';
const Post = (props) => {

  const focusedPosts = useSelector(selectFocusedPosts);
  const dispatch = useDispatch();
  // console.log('posts',focusedPosts)
  // console.log('thread props',props);
  return (
    <div className="message-container" >
      <div className={`content-message ${focusedPosts.includes(props.id)?'focused-message':''}`} onClick={()=>dispatch(focusPost({postId: props.id, topic: props.topicId?props.topicId:''}))}>
          <div className="message-topbar"><div>{props.title}</div><div className="right-bar">➕ ➖ 🍋</div></div>
          {props.content}<br/>id:{props.id}
      </div>
      {focusedPosts.includes(props.id)?<PostList replies={props.replies}/>:''}
    </div>
  );
};

export default Post;
