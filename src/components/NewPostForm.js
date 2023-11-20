import React, {useState} from 'react';

const NewPostForm = (props) => {

    return (
        <div className="post-form">
            <button className="close-button medium-text" onClick={()=>props.toggleVisibility()}>x</button>
            <div>
                <div className="medium-text">title</div>
                <input className="post-title medium-text"></input>
            </div>
            <div>
                <div className="medium-text">text</div>
                <textarea className="post-content medium-text"></textarea>
            </div>
            <div className="relative-container">
                <button className="submit-button small-text">Create New Thread</button>
            </div>
        </div>
    );
};

export default NewPostForm;
