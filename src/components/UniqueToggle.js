import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toggleVisibility } from '../slices/formVisibilitySlice';

const UniqueToggle = ({ children, componentName }) => {
    const [uuid] = useState(uuidv4());
    const dispatch = useDispatch();

    const toggleVisibilityHandler = () => {
        dispatch(toggleVisibility({ name: componentName, uuid }));
    };

    const isVisible = useSelector(state => state.formVisibility.visibleComponents[componentName] === uuid);

    const childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, { toggleVisibility: toggleVisibilityHandler, isVisible: isVisible });
    });

    return <>{childrenWithProps}</>;
};

export default UniqueToggle;
