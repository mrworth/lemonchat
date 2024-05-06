import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addReply } from '../slices/actions/addReply'; 

const NewTopic = ({toggleVisibility, isVisible}) => {
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const formRef = useRef(null); 

    useEffect(() => {
        if (isVisible && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            const rect = formRef.current.getBoundingClientRect();
            window.scrollTo({left: 5000,top:0, behavior: 'smooth'});
        }
    }, [isVisible]);

    const handleSubmit = () => {
        dispatch(addReply({ 
            topic, 
            title, 
            content,
            inReplyTo: null,
            username: "testusername"
        }));
        toggleVisibility();
    };

    return (
        <div className="content-column margin-right">
            <div className="content-row">
                {!isVisible && <button className="toggle-button small-text" onClick={toggleVisibility}>Create New Topic</button>}
                {isVisible && <div className="post-form" ref={formRef}>
                <button className="close-button medium-text" onClick={() => toggleVisibility()}>x</button>
                    <div>
                        <div className="medium-text">Topic Name</div>
                        <input 
                            value={topic} 
                            onChange={(e) => setTopic(e.target.value)} 
                        />
                    </div>
                    <div>
                        <div className="medium-text">Title</div>
                        <input 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>
                    <div>
                        <div className="medium-text">Content</div>
                        <textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                        />
                    </div>
                    <button className="submit-button small-text" onClick={handleSubmit}>Create Topic</button>
                </div>
                }
            </div>
        </div>
    );
};

export default NewTopic;
