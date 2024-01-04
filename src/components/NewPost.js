import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; 
import { addMessage } from '../slices/postSlice';

const NewPost = (props) => {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.stopPropagation();
        const threadId = uuidv4();
        dispatch(addMessage({ 
            replyTo: props.replyTo, 
            threadId: threadId, 
            content: content
        }));
        props.toggleVisibility(event);
    };
    return (
        <div className="post-form">
            <div>
                <div className="medium-text">reply</div>
                <textarea
                    className="post-content medium-text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="relative-container">
                <button className="submit-button small-text" onClick={handleSubmit}>Reply</button>
            </div>
        </div>
    );
};

export default NewPost;
