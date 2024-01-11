import React from 'react';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, selectIsAuthenticated } from '../slices/authSlice';

const GoogleSignInButton = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    const handleLogin = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2) {
            auth2.signIn();
        }
    };

    const handleLogout = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2) {
            auth2.signOut().then(() => {
                dispatch(signOut());
            });
        }
    };

    return isAuthenticated ? (
        <button onClick={handleLogout}>Sign out</button>
    ) : (
        <button onClick={handleLogin}>Sign in with Google</button>
    );
};

export default GoogleSignInButton;
