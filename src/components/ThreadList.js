import React from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../slices/postSlice';
import Thread from './Thread';
import UniqueToggle from './UniqueToggle';
import NewThread from './NewThread';

const ThreadList = () => {
  const topics = useSelector(selectPosts);
  console.log(topics)
  console.log(Object.values(topics)[0])
  return (
    <div className="content-pane">
        {Object.values(topics).map((topic) => (
          <div className="content-column" key={topic.id}>{`${topic.title}`}
            <UniqueToggle componentName="NewThread">
              <NewThread topic={topic}/>
            </UniqueToggle>
            {Object.values(topic.threads).map((thread) => (
              <div className="content-row" key={thread.id}>
                <Thread key={thread.id} {...thread}/>
              </div>
            ))}
          </div>
        ))}
        <div className="content-column"></div>
    </div>
  );
};

export default ThreadList;
