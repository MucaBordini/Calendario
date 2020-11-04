import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './features/user/User';
import Calendar from './features/calendar/Calendar';

function App() {
  const [logado, setLogado] = useState(false)

  useEffect(() => {
    
    if (localStorage.getItem('token') !== null ){
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, []);

  return (
    
    <div className="App">
      <header className="App-header">
      { logado ? 
        <Calendar />
        :
        <User />
      }
        
      </header>
    </div>
  )
}

export default App;
