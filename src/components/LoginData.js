import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectUserName, selectToken, selectIsAuthenticated } from '../slices/authSlice';
import GoogleSignInButton from './GoogleSignInButton';

const LoginData = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userName = useSelector(selectUserName);
  window.token = useSelector(selectToken);

  return (
    <div className="temp-left-margin">
        {user
            ?
            <div>
                <p>Welcome, {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Id: {user.id}</p>
                <p>Username: {userName?userName:''}</p>
            </div>
            :
            ''}
        <GoogleSignInButton />
    </div>
  );
};

export default LoginData;
