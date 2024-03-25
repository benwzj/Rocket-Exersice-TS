import React from 'react';
import SpaceHeader from './components/SpaceHeader';
import Missions from './components/Missions';
import SpaceFooter from './components/SpaceFooter';
import './App.scss';

function App() {
  return (
  <div className="App">
    <SpaceHeader/>
    <Missions/>
    <SpaceFooter/>
  </div>
  );
}

export default App;
