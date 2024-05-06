import React, { useState, useRef } from 'react';
import PostList from './PostList';
import { useSelector, useDispatch } from 'react-redux';
import { focusPost, selectFocusedPosts } from '../slices/focusPostSlice';
import UniqueToggle from './UniqueToggle';
import NewPost from './NewPost';

const Post = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const postRef = useRef(null); // Reference to the post element

  const focusedPosts = useSelector(selectFocusedPosts);
  const dispatch = useDispatch();

  const postFocus = () => {
    if (props.replies.length > 0) {
      dispatch(focusPost({
        postId: props.id, 
        parentPostId: props.parentId,
        topic: props.topicId ? props.topicId : ''
      }));

      if (postRef.current) {
        const rect = postRef.current.getBoundingClientRect();
        const contentPane = document.getElementsByClassName("content-pane")[0];
        // Calculate the absolute position by adding the scroll offsets
        const absoluteX = contentPane.scrollLeft + rect.left - rect.width;
        const absoluteY = rect.top + window.scrollY - rect.height/2 - (window.outerHeight * .2);
        window.scrollTo({
          top: absoluteY,
          behavior: 'smooth'
        });
        contentPane.scrollTo({
          left: absoluteX,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReply = (event) => {
    event.stopPropagation();
    setShowReplyForm(!showReplyForm);
  };

  const handleHide = (event) => {
    event.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <div ref={postRef} className={`message-container ${props.replies.length === 0 ? 'no-replies' : ''}`}>
      <div 
        className={`content-message ${focusedPosts.includes(props.id) && props.replies.length > 0 ? 'focused-message' : ''}`} 
        onClick={postFocus}
      >
        <div className="message-bar topbar">
          <div>{props.title}</div>
        </div>
        <span style={{ height: `${isExpanded ? 'fit-content' : 'min(11vh,11vw)'}` }}>
          id:{props.id}//{props.content}
        </span>
        <div className="message-bar botbar">
          <div>[username]</div>
          <div className="right-bar gray-text">
            <div onClick={handleExpand}>{isExpanded ? '[collapse]' : '[expand]'}</div>
            <div onClick={handleReply}>{showReplyForm ? '[cancel reply]' : '[reply]'}</div>
            <div onClick={handleHide}>{isVisible ? '[hide]' : '[show]'}</div>
            <div>🍋</div>
          </div>
        </div>
      </div>
      {showReplyForm && <NewPost inReplyTo={props.id} toggleVisibility={handleReply} />}
      {focusedPosts.includes(props.id) ? <PostList replies={props.replies} parentId={props.id} /> : ''}
    </div>
  );
};

export default Post;
