import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';

function GapiInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    function initClient() {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: 'email',
        })
      });
    }
    initClient();
  }, [dispatch]);

  return null; // This component doesn't render anything
}

export default GapiInit;
