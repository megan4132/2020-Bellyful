import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainAppBar from './Menu'
import LoginTab from './LoginExample'


function App() {
  return (
    <div className="App">
      <MainAppBar/>
      <header className="App-header">
      <LoginTab/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  );
}

export default App;
