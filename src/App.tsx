import React from 'react';
import './App.css';
import Metronome from './components/Metronome';

function App() {
  return (
    <div className="App">
      <Metronome />
      <p className='see-also'>
        see also: 
        <a href='https://yotam-flask-site.herokuapp.com'> yoti, </a>
        <a href='https://nirtheking.herokuapp.com/'> soliman, </a> 
        <a href='https://broshi.herokuapp.com/'> broshi, </a>
      </p>
    </div>
  );
}

export default App;
