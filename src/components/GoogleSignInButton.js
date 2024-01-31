import React, { useState } from 'react';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut, selectIsAuthenticated } from '../slices/authSlice';

const GoogleSignInButton = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const [isSigningIn, setIsSigningIn] = useState(false); // State to track signing in process

    const handleLogin = () => {
        if (isSigningIn) return; // Prevent multiple sign-ins
        setIsSigningIn(true);

        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2) {
            auth2.signIn().then(googleUser => {
                const profile = googleUser.getBasicProfile();
                const id_token = googleUser.getAuthResponse().id_token;

                // Dispatching the sign in action with user profile and token
                dispatch(signIn({
                    user: {
                        id: profile.getId(),
                        name: profile.getName(),
                        imageUrl: profile.getImageUrl(),
                        email: profile.getEmail()
                    },
                    token: id_token
                }));
                setIsSigningIn(false); // Reset the signing in state
            }).catch(() => {
                setIsSigningIn(false); // Reset the signing in state in case of an error
            });
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
        <button onClick={handleLogin} disabled={isSigningIn}>Sign in with Google</button>
    );
};

export default GoogleSignInButton;
