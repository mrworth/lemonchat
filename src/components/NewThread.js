import React from 'react';
import NewPostForm from './NewPostForm';

const NewThread = ({ topic, toggleVisibility, isVisible }) => {
    return (
        <div>
            {!isVisible && <button className="toggle-button small-text" onClick={toggleVisibility}>make new {topic.title} thread</button>}
            {isVisible && <NewPostForm topic={topic} toggleVisibility={toggleVisibility}/>}
        </div>
    );
};

export default NewThread;
