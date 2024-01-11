import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ThreadList from './components/ThreadList';
import GapiInit from './components/GapiInit';
import GoogleSignInButton from './components/GoogleSignInButton'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GapiInit />
        <div className="navbar"><GoogleSignInButton/></div>
        <div className="name-bar">
            LemonChat
            <img src="/lemon-transparent.png" className="logo-image" alt="Lemon Logo" />
        </div>
        <div className="blur-pane"></div>
        <ThreadList />
      </div>
    </Provider>
  );
}

export default App;
