import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './features/user/User';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <User />
      </header>
    </div>
  )
}

export default App;
