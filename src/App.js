import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store'; 
import ThreadList from './components/ThreadList'; 

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="navbar"></div>
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