import React from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../slices/postSlice';
import {  selectFocusedPosts, selectFocusedTopic } from '../slices/focusPostSlice';
import Post from './Post';
import UniqueToggle from './UniqueToggle';
import NewThread from './NewThread';

const ThreadList = () => {
  const topics = useSelector(selectPosts);
  const focusedPosts = useSelector(selectFocusedPosts);
  const focusedTopic = useSelector(selectFocusedTopic);
  const rightMargin = (focusedPosts.length * 36.5) + "%"

  console.log('topic:::::',topics,focusedTopic)

  const spacingColumns = Array.from({ length: focusedPosts.length +1 }, (_, index) => (
    <div className="content-column"></div>
  ));
  return (
    <div className="content-pane">
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
        
        {spacingColumns}
    </div>
  );
};

export default ThreadList;
