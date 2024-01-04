import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../slices/postSlice';
import {  selectFocusedPosts, selectFocusedTopic, selectContentPanePosition } from '../slices/focusPostSlice';
import Post from './Post';
import UniqueToggle from './UniqueToggle';
import NewThread from './NewThread';
import NewTopic from './NewTopic';

const ThreadList = () => {
  const topics = useSelector(selectPosts);
  const focusedPosts = useSelector(selectFocusedPosts);
  const focusedTopic = useSelector(selectFocusedTopic);
  const rightMargin = (focusedPosts.length * 36.5) + "%"
  const { contentPaneX, contentPaneY } = useSelector(selectContentPanePosition); // Assuming this selector exists
  const contentPaneRef = useRef(null);

  const newTopicColumn = Array.from({ length: (focusedPosts.length/2) +1 }, (_, index) => (
    <UniqueToggle componentName="NewTopic">
      <NewTopic/>
    </UniqueToggle>
  ));

  useEffect(() => {
    if (contentPaneRef.current) {
      console.log('scrolling',contentPaneX,contentPaneY)
      contentPaneRef.current.scrollTo({
        left: contentPaneX,
        top: contentPaneY,
        behavior: 'smooth'
      });
    }
  }, [contentPaneX, contentPaneY]);

  return (
    <div className="content-pane" ref={contentPaneRef}>
        {Object.values(topics).map((topic) => (
          <div className="content-column" key={topic.id}
            style={{
                marginRight: topic.id === focusedTopic ? rightMargin: "0"
            }}
            >{`${topic.title}`}
            <UniqueToggle componentName="NewThread">
              <NewThread topic={topic}/>
            </UniqueToggle>
            {Object.values(topic.threads).map((thread) => (
              <div className="content-row" key={thread.id}>
                <Post key={thread.id} topicId={topic.id} {...thread}/>
              </div>
            ))}
          </div>
        ))}
        
        {newTopicColumn}
    </div>
  );
};

export default ThreadList;
