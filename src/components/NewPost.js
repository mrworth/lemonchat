import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReply } from '../slices//actions/addReply';

const NewPost = (props) => {
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.stopPropagation();
        dispatch(addReply({ 
            content: content,
            //TODO: replace with state username
            username: "testusername",
            title: "Test Title",
            topic: "Test Topic",
            inReplyTo: props.inReplyTo, 
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
