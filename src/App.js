import React from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './Users';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Users />
    </div>
  );
}

export default App;
