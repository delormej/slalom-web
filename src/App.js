import React from 'react';
import './App.css';
import VideoList from './VideoList.js'

function App() {


  return (
    <div className="App">
      <VideoList />
      Env: <b>{process.env.NODE_ENV}</b><br/>
      Version: <b>{process.env.REACT_APP_VERSION}</b><br/>
    </div>
  );
}

export default App;
