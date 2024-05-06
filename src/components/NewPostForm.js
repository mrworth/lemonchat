import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addThread } from '../slices/actions/addThread';

const NewPostForm = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const formRef = useRef(null); 

    useEffect(() => {
        if ( formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    });

    const handleSubmit = () => {
        console.log(props);
        dispatch(addThread({ topic: props.topic.topic, title, content, inReplyTo: props.topic.postId, username: "testusername" }));
        props.toggleVisibility(); 
    };

    return (
        <div className="post-form" ref={formRef}>
            <button className="close-button medium-text" onClick={() => props.toggleVisibility()}>x</button>
            <div>
                <div className="medium-text">title (topic is {props.topic.id})</div>
                <input
                    className="post-title medium-text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <div className="medium-text">text</div>
                <textarea
                    className="post-content medium-text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="relative-container">
                <button className="submit-button small-text" onClick={handleSubmit}>Create New Thread</button>
            </div>
        </div>
    );
};

export default NewPostForm;
