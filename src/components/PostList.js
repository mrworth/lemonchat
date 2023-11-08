import React from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../slices/postSlice';
import Post from './Post';

const PostList = () => {
  const topics = useSelector(selectPosts);
  console.log(topics)
  console.log(Object.values(topics)[0])
  return (
    <div className="content-pane">
        {Object.values(topics).map((topic) => (
          <div className="content-column" key={topic.id}>{`${topic.title}`}
            {Object.values(topic.threads).map((thread) => (
              <div className="content-row" key={thread.id}>
                <Post key={thread.id} {...thread}>
                </Post>
              </div>
            ))}
          </div>
        ))}
        <div className="content-column"></div>
    </div>
  );
};

export default PostList;
