import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTopicPosts } from '../slices/actions/fetchTopicPosts'; // Adjust the import path as necessary

const AppLoader = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTopicPosts());
    }, [dispatch]); 

    return (
        <div>
        </div>
    );
};

export default AppLoader;
