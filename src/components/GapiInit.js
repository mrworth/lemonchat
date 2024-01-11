import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';
import { signIn, signOut } from '../slices/authSlice';

function GapiInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    function initClient() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'email',
        }).then(() => {
          const auth = gapi.auth2.getAuthInstance();
          if (auth.isSignedIn.get()) {
            dispatch(signIn(auth.currentUser.get().getBasicProfile()));
          }
          auth.isSignedIn.listen(isSignedIn => {
            if (isSignedIn) {
              dispatch(signIn(auth.currentUser.get().getBasicProfile()));
            } else {
              dispatch(signOut());
            }
          });
        });
      });
    }
    initClient();
  }, [dispatch]);

  return null; // This component doesn't render anything
}

export default GapiInit;
